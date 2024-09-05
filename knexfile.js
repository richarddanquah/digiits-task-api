"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
const config = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'src/db/migrations/'),
            extension: 'ts', // Ensure TypeScript files are recognized
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'src/db/seeds'),
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path_1.default.join(__dirname, 'src/db/migrations'),
            extension: 'ts',
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'src/db/seeds'),
        },
    },
};
exports.default = config;
