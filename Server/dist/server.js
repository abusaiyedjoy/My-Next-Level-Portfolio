"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const seedAdmin_1 = require("./utils/seedAdmin");
dotenv_1.default.config();
let server = null;
async function connectToDB() {
    try {
        await db_1.prisma.$connect();
        console.log("*** DB connection successfull!!");
    }
    catch (error) {
        console.log("*** DB connection failed!");
        process.exit(1);
    }
}
async function startServer() {
    try {
        await connectToDB();
        server = http_1.default.createServer(app_1.default);
        server.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
        });
        // handleProcessEvents();
    }
    catch (error) {
        console.error("❌ Error during server startup:", error);
        process.exit(1);
    }
}
(async () => {
    await startServer();
    await (0, seedAdmin_1.seedAdmin)();
})();
// Graceful Shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await db_1.prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await db_1.prisma.$disconnect();
    process.exit(0);
});
