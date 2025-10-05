import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getAdminSession = async () => await getServerSession(authOptions);