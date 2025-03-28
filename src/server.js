import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { config } from './config/config.js';
import transcriptRoutes from './routes/transcriptRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Create transcripts directory if it doesn't exist
fs.mkdir(config.transcriptsDir, { recursive: true }).catch(console.error);

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Routes
app.use('/api', transcriptRoutes);

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
}); 