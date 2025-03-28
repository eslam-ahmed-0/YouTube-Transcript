import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    port: process.env.PORT || 3000,
    transcriptsDir: join(__dirname, '..', '..', 'transcripts'),
    youtubeDlOptions: {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        extractorArgs: ['youtube:tab_type']
    }
}; 