import { YoutubeTranscript } from 'youtube-transcript';
import youtubedl from 'youtube-dl-exec';
import { config } from '../config/config.js';
import { formatTime } from '../utils/fileUtils.js';

export class YouTubeService {
    static async getVideoTitle(url) {
        try {
            const info = await youtubedl(url, config.youtubeDlOptions);
            return info.title;
        } catch (error) {
            console.error('Error getting video title:', error);
            return null;
        }
    }

    static async getPlaylistInfo(url) {
        try {
            const info = await youtubedl(url, config.youtubeDlOptions);
            return {
                title: info.title,
                playlistId: info.id,
                entries: info.entries.map(entry => ({
                    url: entry.webpage_url,
                    title: entry.title
                }))
            };
        } catch (error) {
            console.error('Error getting playlist info:', error);
            return null;
        }
    }

    static async processVideoTranscript(url, includeTimestamps = false) {
        const videoTitle = await this.getVideoTitle(url);
        if (!videoTitle) {
            throw new Error('Could not get video title');
        }

        const transcript = await YoutubeTranscript.fetchTranscript(url, {
            lang: 'ar'
        });

        const formattedTranscript = transcript
            .map(item => {
                if (!includeTimestamps) {
                    return item.text;
                }
                const timestamp = formatTime(item.offset);
                return `[${timestamp}] ${item.text}`;
            })
            .join(includeTimestamps ? '\n' : ' ');

        return {
            title: videoTitle,
            content: formattedTranscript
        };
    }
} 