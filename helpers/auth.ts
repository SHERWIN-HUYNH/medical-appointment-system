import config from "@/lib/config";
import { LoginSchema } from "@/validation/login";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "./hash";
import { UserRepository } from "@/repositories/user";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	secret: config.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
		error: "/login",
	},
	callbacks: {
		async redirect({url, baseUrl}) {
			return url.startsWith(baseUrl)
			  ? url
			  : baseUrl
		  }
	},
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const { email, password } = LoginSchema.parse(credentials);

					const user = await UserRepository.getUserByEmail(email);
					console.log("USER: ", user);
					if (!user) {
						throw new Error("Invalid credentials!");
					}

					// const isPasswordCorrect = await comparePassword(
					// 	password,
					// 	user.password
					// );
					const isPasswordCorrect = false
					if (!isPasswordCorrect) {
						throw new Error("Invalid credentials!");
					}

					return {
						id: user.id,
						email: user.email,
					};
				} catch (error) {
					if (error instanceof Error) {
						throw new Error(error.message || "An error occurred!");
					}
					return null;
				}
			},
		}),
	],
};
