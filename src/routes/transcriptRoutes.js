import express from 'express';
import { TranscriptController } from '../controllers/transcriptController.js';

const router = express.Router();

router.post('/transcript', TranscriptController.getTranscript);
router.post('/download', TranscriptController.downloadTranscript);
router.get('/download-playlist/:playlistId', TranscriptController.downloadPlaylist);

export default router; 