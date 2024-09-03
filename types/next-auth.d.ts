import NextAuth from "next-auth/next";
declare module "next-auth" {
    interface Session {
      user: {
        id: string,
        name:string,
        email:string,
        phoneNumber:string
        accessToken: string
      };
    }
  }