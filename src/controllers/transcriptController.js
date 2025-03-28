import fs from 'fs/promises';
import { join } from 'path';
import archiver from 'archiver';
import { YouTubeService } from '../services/youtubeService.js';
import { config } from '../config/config.js';
import { sanitizeFilename } from '../utils/fileUtils.js';

export class TranscriptController {
    static async getTranscript(req, res) {
        try {
            const { url, includeTimestamps = false } = req.body;
            
            if (!url) {
                return res.status(400).json({ error: 'URL is required' });
            }

            const isPlaylist = url.includes('playlist?list=');
            
            if (isPlaylist) {
                return await this.handlePlaylist(url, includeTimestamps, res);
            } else {
                return await this.handleSingleVideo(url, includeTimestamps, res);
            }
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async handleSingleVideo(url, includeTimestamps, res) {
        const transcript = await YouTubeService.processVideoTranscript(url, includeTimestamps);
        const filename = `${sanitizeFilename(transcript.title)}.txt`;

        res.json({
            transcript: transcript.content,
            filename: filename,
            videoTitle: transcript.title,
            message: `Transcript ready for download`
        });
    }

    static async handlePlaylist(url, includeTimestamps, res) {
        const playlistInfo = await YouTubeService.getPlaylistInfo(url);
        if (!playlistInfo) {
            return res.status(400).json({ error: 'Could not get playlist information' });
        }

        const playlistDir = join(config.transcriptsDir, sanitizeFilename(playlistInfo.title));
        await fs.mkdir(playlistDir, { recursive: true });

        const results = [];
        for (const entry of playlistInfo.entries) {
            try {
                const transcript = await YouTubeService.processVideoTranscript(entry.url, includeTimestamps);
                const filename = `${sanitizeFilename(transcript.title)}.txt`;
                const filepath = join(playlistDir, filename);
                
                await fs.writeFile(filepath, transcript.content, 'utf-8');
                
                results.push({
                    title: transcript.title,
                    filename: filename,
                    status: 'success'
                });
            } catch (error) {
                results.push({
                    title: entry.title,
                    error: error.message,
                    status: 'error'
                });
            }
        }

        res.json({
            message: `Playlist processing complete. ${results.length} videos processed.`,
            results: results,
            playlistTitle: playlistInfo.title,
            playlistId: playlistInfo.playlistId
        });
    }

    static async downloadTranscript(req, res) {
        try {
            const { transcript, filename } = req.body;
            
            if (!transcript || !filename) {
                return res.status(400).json({ error: 'Transcript and filename are required' });
            }

            res.setHeader('Content-Type', 'text/plain');
            const encodedFilename = encodeURIComponent(filename);
            res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`);
            
            res.send(transcript);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async downloadPlaylist(req, res) {
        try {
            const { playlistId } = req.params;
            
            const playlistDirs = await fs.readdir(config.transcriptsDir);
            const playlistDir = playlistDirs.find(dir => dir.includes(playlistId));
            
            if (!playlistDir) {
                return res.status(404).json({ error: 'Playlist not found' });
            }

            const playlistPath = join(config.transcriptsDir, playlistDir);
            
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });

            res.attachment(`${playlistDir}.zip`);
            archive.pipe(res);

            archive.directory(playlistPath, false);

            await archive.finalize();

            archive.on('error', (err) => {
                console.error('Archive error:', err);
                res.status(500).json({ error: 'Failed to create ZIP file' });
            });
        } catch (error) {
            console.error('Error creating ZIP:', error);
            res.status(500).json({ error: 'Failed to create ZIP file' });
        }
    }
} 