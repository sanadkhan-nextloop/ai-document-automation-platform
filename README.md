# SmartFill AI - AI Document Automation Platform

> **Demo MVP** - AI-powered PDF document processing with intelligent text generation

Transform your documents with AI. Upload a PDF, provide a prompt, and let AI generate and insert relevant content automatically.

## 🎯 Overview

SmartFill AI is a full-stack application that demonstrates AI-powered document automation. It extracts text from PDFs, uses LLMs to generate contextual content based on user prompts, and creates modified PDFs with the generated text inserted.

### Key Features

- 📄 **PDF Upload** - Support for native text PDFs
- 🤖 **AI Generation** - OpenAI integration for intelligent content creation
- 🔍 **Smart Detection** - Heuristic detection of fillable sections
- ✍️ **Text Injection** - Seamless text insertion into PDFs
- 📥 **Easy Download** - Get your processed document instantly

## 🏗️ Architecture

```
SmartFill AI
├── Backend (Node.js + Express)
│   ├── PDF Processing (pdf-parse, pdf-lib)
│   ├── AI Integration (OpenAI API)
│   └── REST API (4 endpoints)
│
└── Frontend (React + Vite)
    ├── File Upload Interface
    └── Download PDF
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key ([Get one here](https://openai.com/api/))

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd cloned-repo-name
```

2. **Setup Backend:**
```bash
cd backend
npm install
# Edit .env and add your OPENAI_API_KEY
npm run start
```

Backend will run on `http://localhost:PORT`

3. **Setup Frontend:**
```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

4. **Test the application:**
   - Open browser to `http://localhost:5173`
   - Upload the sample PDF from `backend/test-document.pdf`
   - Enter a prompt like: *"Write a professional introduction about AI automation"*
   - Click Generate
   - Download your processed PDF

## 📁 Project Structure

```
main-folder/
│
├── backend/                      # Node.js + Express API
│   ├── src/
│   │   ├── config/              # Configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API endpoints
│   │   ├── services/            # Business logic (PDF, AI)
│   │   ├── middleware/          # Express middleware
│   │   └── utils/               # Helper functions
│   ├── uploads/                 # Temporary uploaded files
│   ├── outputs/                 # Generated PDFs
│   ├── package.json
│   └── README.md               # Backend documentation
│
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API client
│   │   ├── hooks/              # Custom React hooks
│   │   └── App.jsx             # Main application
│   ├── package.json
│   └── README.md               # Frontend documentation
│
└── README.md                   # This file
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/upload` | POST | Upload PDF file |
| `/api/generate` | POST | Generate content with AI |
| `/api/download/:jobId` | GET | Download processed PDF |

## 🎨 User Flow

```mermaid
graph LR
    A[Upload PDF] --> B[Enter Prompt]
    B --> C[Click Generate]
    C --> D[AI Processing]
    D --> E[Status: Processing]
    E --> F[Status: Completed]
    F --> G[Download PDF]
```

## 🛠️ Tech Stack

### Backend
- **Framework:** Express.js
- **PDF Processing:** pdf-lib
- **AI Integration:** openai
- **File Upload:** Multer
- **Job Management:** In-memory store

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios / Fetch API
- **UI Components:** Custom components

## 📖 Documentation

Detailed documentation for each component:

- **Backend:** See [backend/README.md](./backend/README.md)
  - API documentation
  - Environment configuration
  - Service architecture
  - Testing guide

- **Frontend:** See [frontend/README.md](./frontend/README.md)
  - Features
  - Tech Stack
  - Quick Start

### Manual Testing
1. Start both backend and frontend
2. Use the sample PDF: `backend/test-document.pdf`
3. Try these example prompts:
   - "Write a professional summary about AI automation benefits"
   - "Create an introduction explaining document processing"
   - "Describe how AI can improve business workflows"

## 🔑 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_claude_api_key_here
PORT=5000
AI_MODE=mock
CORS_ORIGINS=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🚦 Development Workflow

1. **Start Backend:** `cd backend && npm run dev`
2. **Start Frontend:** `cd frontend && npm run dev`
3. **Make Changes:** Code with hot-reload enabled
4. **Test:** Upload PDF → Generate → Download
5. **Commit:** Use meaningful commit messages

## 🚧 Known Limitations (MVP Scope)

- In-memory job storage (resets on server restart)
- Simple heuristic for section detection
- No authentication/authorization
- No database persistence
- Limited to native text PDFs
- Single concurrent processing per job

## 🔮 Future Enhancements

- [ ] Multiple section detection
- [ ] Advanced PDF form field detection
- [ ] User authentication
- [ ] Job history and persistence (Redis/PostgreSQL)
- [ ] Batch processing
- [ ] PDF preview with highlighted sections
- [ ] Template support
- [ ] Multiple AI model support (GPT-4, etc.)
- [ ] OCR for scanned documents
- [ ] Real-time collaboration

## 🤝 Contributing

This is a demo MVP. For production use:
1. Add proper authentication
2. Implement database for job persistence
3. Add input validation (Joi/Zod)
4. Set up rate limiting
5. Add comprehensive error handling
6. Implement file cleanup scheduler
7. Add unit and integration tests
8. Set up CI/CD pipeline

## 📝 License

MIT License - See LICENSE file for details

## 🐛 Troubleshooting

### Backend Issues
- **Port in use:** Change `PORT` in `.env`
- **API key error:** Verify `OPENAI_API_KEY` in `.env`
- **Upload fails:** Check file format and size

### Frontend Issues
- **Can't connect to API:** Verify backend is running on correct port
- **CORS errors:** Check backend CORS configuration
- **Build errors:** Delete `node_modules` and reinstall

## 📞 Support

For issues or questions:
1. Check component README files (backend/frontend)
2. Review code comments
3. Check API documentation
4. Review error logs in terminal


---
