"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordLoginAttempt = exports.checkLoginAttempts = void 0;
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const checkLoginAttempts = async (adminId) => {
    const admin = await db_1.prisma.admin.findUnique({
        where: { id: adminId },
        select: { isBlocked: true, blockedUntil: true },
    });
    if (!admin)
        return false;
    // চেক করুন ব্লক টাইম শেষ হয়েছে কিনা
    if (admin.isBlocked && admin.blockedUntil) {
        if (new Date() > admin.blockedUntil) {
            // ব্লক সময় শেষ - আনব্লক করুন
            await db_1.prisma.admin.update({
                where: { id: adminId },
                data: {
                    isBlocked: false,
                    blockedUntil: null,
                },
            });
            // পুরাতন attempts মুছে ফেলুন
            await db_1.prisma.loginAttempt.deleteMany({
                where: { adminId },
            });
            return true;
        }
        return false;
    }
    // শেষ ৩০ মিনিটের ফেইল attempts গণনা করুন
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const failedAttempts = await db_1.prisma.loginAttempt.count({
        where: {
            adminId,
            success: false,
            createdAt: { gte: thirtyMinutesAgo },
        },
    });
    if (failedAttempts >= env_1.envVars.MAX_LOGIN_ATTEMPTS) {
        // ইউজারকে ব্লক করুন
        const blockedUntil = new Date(Date.now() + env_1.envVars.BLOCK_DURATION_MINUTES * 60 * 1000);
        await db_1.prisma.admin.update({
            where: { id: adminId },
            data: {
                isBlocked: true,
                blockedUntil,
            },
        });
        return false;
    }
    return true;
};
exports.checkLoginAttempts = checkLoginAttempts;
const recordLoginAttempt = async (adminId, ipAddress, success) => {
    await db_1.prisma.loginAttempt.create({
        data: {
            adminId,
            ipAddress,
            success,
        },
    });
    // সফল লগইনে পুরাতন attempts মুছে ফেলুন
    if (success) {
        await db_1.prisma.loginAttempt.deleteMany({
            where: {
                adminId,
                success: false,
            },
        });
    }
};
exports.recordLoginAttempt = recordLoginAttempt;
