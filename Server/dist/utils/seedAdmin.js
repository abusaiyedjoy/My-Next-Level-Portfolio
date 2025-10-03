"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const password_1 = require("./password");
const seedAdmin = async () => {
    try {
        const adminCount = await db_1.prisma.admin.count();
        if (adminCount > 0) {
            console.log('✅ Admin account already exists');
            return;
        }
        console.log('🔧 No admin found. Creating admin account...');
        const hashedPassword = await (0, password_1.hashPassword)(env_1.envVars.ADMIN_PASSWORD);
        const admin = await db_1.prisma.admin.create({
            data: {
                name: env_1.envVars.ADMIN_NAME,
                email: env_1.envVars.ADMIN_EMAIL,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
        console.log('✅ Admin account created successfully!');
    }
    catch (error) {
        console.error('❌ Error creating admin account:', error);
        throw error;
    }
};
exports.seedAdmin = seedAdmin;
