import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import { seedAdmin } from "./utils/seedAdmin";

dotenv.config();

let server: Server | null = null;

async function connectToDB() {
  try {
    await prisma.$connect()
    console.log("*** DB connection successfull!!")
  } catch (error) {
    console.log("*** DB connection failed!")
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDB()
    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });

    // handleProcessEvents();
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}
(async () => {
    await startServer()
    await seedAdmin()
})()



// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});