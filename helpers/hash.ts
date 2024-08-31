import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
};
