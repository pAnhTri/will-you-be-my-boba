import { Session } from "@/types";
import * as jose from "jose";

const verifyToken = async (token: string): Promise<Session | null> => {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET)
    );
    return payload as Session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSessionPayload = async (
  token: string
): Promise<Session | null> => {
  const payload = await verifyToken(token);
  if (!payload) return null;
  return {
    sub: payload.sub,
    email: payload.email,
  };
};
