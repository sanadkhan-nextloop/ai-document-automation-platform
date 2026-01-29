const express = require("express");
const cors = require("cors");
const { UPLOAD_DIR, OUTPUT_DIR } = require("./config/paths");
const fs = require("fs");
const { CORS_ORIGINS } = require("./config/env");

const uploadRoutes = require("./routes/upload.routes");
const generateRoutes = require("./routes/generate.routes");
const downloadRoutes = require("./routes/download.routes");

const app = express();

[UPLOAD_DIR, OUTPUT_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
});

const allowedOrigins = CORS_ORIGINS
  ? CORS_ORIGINS.split(",").map(o => o.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server calls (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/download", downloadRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
