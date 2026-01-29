require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  AI_MODE: process.env.AI_MODE,
  CORS_ORIGINS: process.env.CORS_ORIGINS
};
