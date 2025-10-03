import { prisma } from '../config/db';
import { envVars } from '../config/env';

export const checkLoginAttempts = async (adminId: string): Promise<boolean> => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { isBlocked: true, blockedUntil: true },
  });

  if (!admin) return false;

  // চেক করুন ব্লক টাইম শেষ হয়েছে কিনা
  if (admin.isBlocked && admin.blockedUntil) {
    if (new Date() > admin.blockedUntil) {
      // ব্লক সময় শেষ - আনব্লক করুন
      await prisma.admin.update({
        where: { id: adminId },
        data: {
          isBlocked: false,
          blockedUntil: null,
        },
      });
      
      // পুরাতন attempts মুছে ফেলুন
      await prisma.loginAttempt.deleteMany({
        where: { adminId },
      });
      
      return true;
    }
    return false;
  }

  // শেষ ৩০ মিনিটের ফেইল attempts গণনা করুন
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const failedAttempts = await prisma.loginAttempt.count({
    where: {
      adminId,
      success: false,
      createdAt: { gte: thirtyMinutesAgo },
    },
  });

  if (failedAttempts >= envVars.MAX_LOGIN_ATTEMPTS) {
    // ইউজারকে ব্লক করুন
    const blockedUntil = new Date(
      Date.now() + envVars.BLOCK_DURATION_MINUTES * 60 * 1000
    );
    
    await prisma.admin.update({
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

export const recordLoginAttempt = async (
  adminId: string,
  ipAddress: string,
  success: boolean
): Promise<void> => {
  await prisma.loginAttempt.create({
    data: {
      adminId,
      ipAddress,
      success,
    },
  });

  // সফল লগইনে পুরাতন attempts মুছে ফেলুন
  if (success) {
    await prisma.loginAttempt.deleteMany({
      where: {
        adminId,
        success: false,
      },
    });
  }
};
