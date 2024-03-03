import * as bcrypt from 'bcryptjs';
import appConfig from '../../config';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = appConfig.rounds;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
