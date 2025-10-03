import { compare } from "bcryptjs";
import { prisma } from "../../config/db";

const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const admin = await prisma.admin.findUnique({
        where: {
            email
        }
    });

    if (!admin) {
        throw new Error("Admin not found!")
    }

    const isValidPassword = await compare(password, admin.password);

    if (isValidPassword) {
        return admin
    }
    else {
        throw new Error("Password is incorrect!")
    }
}


export const AuthService = {
    loginWithEmailAndPassword,
}