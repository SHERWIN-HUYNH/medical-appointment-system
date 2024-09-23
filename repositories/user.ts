import prisma from "@/lib/prisma";
export interface CreateUserDto {
	name:string
	email: string;
	password: string;
    phone: string;
}
export class UserRepository {
    static async getUserByEmail(email: string) {
        return await prisma.user.findFirst({ where: { email } });
    }
    static async insert({ name,email, password,phone }: CreateUserDto) {
		return prisma.user.create({
			data: {
				name,
				email,
				password,
                phone
			},
		});
	}
}