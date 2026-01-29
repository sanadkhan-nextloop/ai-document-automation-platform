# Smartfill AI - Backend

AI-powered PDF form filling service that automatically detects and fills blank fields in PDF documents.

## 🚀 Features

- 📄 **PDF Upload & Processing** - Upload PDFs and extract fillable sections
- 🤖 **AI-Powered Text Generation** - Uses OpenAI to generate realistic form data
- ⬇️ **PDF Download** - Download filled PDFs with generated content
- 🎯 **Job-based Architecture** - Asynchronous processing with job IDs
- 🔄 **Three-Step Workflow** - Upload → Generate → Download

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- OpenAI API key

## 🛠️ Installation

### Step 1: Clone & Install

```bash
cd backend
npm install
```

### Step 2: Environment Setup

Create a `.env` file in the backend directory:

```env
PORT=8000
OPENAI_API_KEY=your_openai_api_key_here
AI_MODE=mock
CORS_ORIGINS=http://localhost:5173
```

**Get OpenAI API Key:**
1. Go to: https://openai.com/api/
2. Sign up / Log in
3. Create new API key
4. Copy and paste in `.env`

### Step 3: Start Server

```bash
npm start
```

Server will run on `http://localhost:8000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.js              # Express server entry point
│   ├── routes/
│   │   └── api.routes.js      # API endpoints
│   ├── controllers/
│   │   ├── upload.controller.js    # PDF upload handler
│   │   ├── generate.controller.js  # AI text generation
│   │   └── download.controller.js  # PDF download handler
│   ├── services/
│   │   ├── job.service.js     # Job management
│   │   ├── ai.service.js      # OpenAI integration
│   │   └── pdf.service.js     # PDF processing
│   └── config/
│       └── env.js             # Environment configuration
├── uploads/                    # Temporary PDF storage
├── outputs/                    # Generated PDFs
├── .env                       # Environment variables
└── package.json
```

## 🔌 API Endpoints

### 1. Upload PDF

**POST** `/api/upload`

Upload a PDF file for processing.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (PDF file)

**Response:**
```json
{
  "jobId": "d6b7c1a5-8f02-4f5e-bf4c-3bb12c7c8f4a"
}
```

**Example (cURL):**
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@/path/to/document.pdf"
```

---

### 2. Generate Filled PDF

**POST** `/api/generate`

Generate AI text and fill the PDF.

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
```json
{
  "jobId": "d6b7c1a5-8f02-4f5e-bf4c-3bb12c7c8f4a",
  "prompt": "Describe in brief how AI can improve business workflows"
}
```

**Response:**
```json
{
  "status": "done",
  "outputPath": "outputs/d6b7c1a5-8f02-4f5e-bf4c-3bb12c7c8f4a.pdf"
}
```

**Example (cURL):**
```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "d6b7c1a5-8f02-4f5e-bf4c-3bb12c7c8f4a",
    "prompt": "Describe in brief how AI can improve business workflows"
  }'
```

---

### 3. Download Filled PDF

**GET** `/api/download/:jobId`

Download the filled PDF file.

**Request:**
- Method: `GET`
- URL: `/api/download/{jobId}`

**Response:**
- PDF file (binary)

**Example (cURL):**
```bash
curl -X GET http://localhost:8000/api/download/d6b7c1a5-8f02-4f5e-bf4c-3bb12c7c8f4a \
  --output filled-document.pdf
```

---

## 🎯 Complete Workflow Example

```javascript
// 1. Upload PDF
const formData = new FormData();
formData.append('file', pdfFile);

const uploadRes = await fetch('http://localhost:8000/api/upload', {
  method: 'POST',
  body: formData
});
const { jobId } = await uploadRes.json();

// 2. Generate filled PDF
const generateRes = await fetch('http://localhost:8000/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jobId: jobId,
    prompt: 'Describe in brief how AI can improve business workflows'
  })
});
const { status } = await generateRes.json();

// 3. Download filled PDF
if (status === 'done') {
  const downloadRes = await fetch(`http://localhost:8000/api/download/${jobId}`);
  const blob = await downloadRes.blob();
  // Save or display the PDF
}
```

## 🤖 AI Configuration

The backend uses **OpenAI GPT-3.5-turbo** for text generation.

### Supported AI Modes

Set in `.env` file:

```env
# OpenAI (Recommended)
AI_MODE=openai
OPENAI_API_KEY=sk-...

# Mock Mode (For Testing)
AI_MODE=mock
# No API key needed - returns fake data
```

### OpenAI Configuration

- **Model:** `gpt-3.5-turbo`
- **Max Tokens:** 1024
- **Temperature:** 0.7
- **Cost:** ~$0.002 per request

**Get Free Credits:**
- New accounts get $5 free credits
- Enough for ~2,500 requests

## 📦 Dependencies

```json
{
  "cors": "^2.8.6",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "multer": "^2.0.2",
  "openai": "^6.16.0",
  "pdf-lib": "^1.17.1",
  "uuid": "^13.0.0"
}
```

## 🔧 Troubleshooting

### Issue: "OPENAI_API_KEY not found"
**Solution:** Make sure `.env` file exists and contains your API key

### Issue: "Invalid API key"
**Solution:** 
1. Check API key is correct
2. Verify key has credits at openai console.
3. Generate new key if needed

### Issue: "File upload failed"
**Solution:** 
- Check file is a valid PDF
- Ensure `uploads/` directory exists
- Check file size max limit

### Issue: "PDF generation failed"
**Solution:**
- Verify jobId is correct
- Check prompt is not empty
- Ensure OpenAI API is accessible

## 🧪 Testing

### Quick Test with cURL

```bash
# 1. Upload
JOBID=$(curl -s -X POST http://localhost:8000/api/upload \
  -F "file=@test.pdf" | jq -r '.jobId')

echo "Job ID: $JOBID"

# 2. Generate
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d "{\"jobId\":\"$JOBID\",\"prompt\":\"Describe in brief how AI can improve business workflows\"}"

# 3. Download
curl http://localhost:8000/api/download/$JOBID --output filled.pdf
```

## 🌐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `8000` | Server port |
| `OPENAI_API_KEY` | Yes* | - | OpenAI API key |
| `AI_MODE` | Yes | `openai` | AI provider (`openai` or `mock`) |

*Required only when `AI_MODE=openai`

## 📝 Notes

- PDFs are temporarily stored in `uploads/` directory
- Generated PDFs are saved in `outputs/` directory
- Job data is stored in-memory (resets on server restart)
- For production, consider using a database for job persistence

## 🔒 Security Considerations

- Add authentication middleware for production
- Implement rate limiting
- Validate and sanitize file uploads
- Use HTTPS in production
- Store API keys securely (never commit `.env` to git)

## 📄 License

MIT

