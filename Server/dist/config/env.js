"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.envVars = {
    // Server
    PORT: process.env.PORT || "5000",
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    DATABASE_URL: process.env.DATABASE_URL,
    // Admin Credentials
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    // Security
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND || "12",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "change-this-secret",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "change-this-refresh-secret",
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    // Rate Limiting
    MAX_LOGIN_ATTEMPTS: Number(process.env.MAX_LOGIN_ATTEMPTS) || 5,
    BLOCK_DURATION_MINUTES: Number(process.env.BLOCK_DURATION_MINUTES) || 30,
};
