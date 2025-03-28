# YouTube Transcript Extractor

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern web application that allows you to easily extract transcripts from YouTube videos. Built with Node.js and Express.js, featuring a clean and intuitive web interface.

## 🌟 Features

- 🎥 Extract transcripts from any YouTube video with available captions
- 🌐 User-friendly web interface
- ⏱️ Timestamps included in the transcript
- 📥 Download transcripts in text format
- 📚 Support for entire playlists
- 🎨 Clean and responsive design
- ⚡ Fast and efficient processing

## 🚀 Live Demo

Visit the live demo at: [Coming Soon]

## 🛠️ Tech Stack

- Node.js
- Express.js
- YouTube Transcript API
- Modern JavaScript (ES6+)
- HTML5 & CSS3

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/eslam-ahmed-0/YouTube-Transcript.git
cd YouTube-Transcript
```

2. Install dependencies:
```bash
npm install
```

## 💻 Usage

1. Start the server:
```bash
npm start
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

3. Enter a YouTube video URL in the input field and click "Extract Transcript"

4. Wait for the processing to complete and download your transcript

## 🛠️ Development

To run the application in development mode with auto-reload:

```bash
npm run dev
```

## 📚 API Endpoints

- `POST /api/transcript`: Extract transcript from a YouTube video
  - Request body: `{ url: "youtube-video-url" }`
  - Returns: Transcript text with timestamps

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [youtube-transcript](https://www.npmjs.com/package/youtube-transcript) for transcript extraction
- [youtube-dl-exec](https://www.npmjs.com/package/youtube-dl-exec) for YouTube video processing
- [Express.js](https://expressjs.com/) for the web framework

## 📞 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the code 