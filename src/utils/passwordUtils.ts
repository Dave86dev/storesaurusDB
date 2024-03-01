import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
