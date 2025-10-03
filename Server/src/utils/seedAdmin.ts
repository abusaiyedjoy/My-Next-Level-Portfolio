import { prisma } from "../config/db";
import { envVars } from "../config/env";
import { hashPassword } from "./password";


export const seedAdmin = async () => {
  try {
    const adminCount = await prisma.admin.count();

    if (adminCount > 0) {
      console.log('✅ Admin account already exists');
      return;
    }

    console.log('🔧 No admin found. Creating admin account...');

    const hashedPassword = await hashPassword(envVars.ADMIN_PASSWORD as string);

     await prisma.admin.create({
      data: {
        name: envVars.ADMIN_NAME as string,
        email: envVars.ADMIN_EMAIL as string,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    console.log('✅ Admin account created successfully!')
  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    throw error;
  }
};



