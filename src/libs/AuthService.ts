import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY as string || '';

dotenv.config();

export default class AuthService
{
    /**
     * 
     * @param password - password asli
     * @returns - password yang sudah di hash
     */
    public hashPassword = async (password: string): Promise<string> =>
    {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    /**
     * 
     * @param password - password asli
     * @param hashedPassword - password yang sudah di hash
     * @returns - mengembalikan boolean dari hasil pengecekkan
     */
    public comparePassword = async (password: string, hashedPassword: string): Promise<boolean> =>
    {
        return await bcrypt.compare(password, hashedPassword);
    }

    /**
     * 
     * @param payload - payload data user
     * @param secretKey - secretKey
     * @param options - options untuk expiresIn
     * @returns 
     */
    public generateToken = (payload: object, secretKey: jwt.Secret, options?: jwt.SignOptions): string =>
    {
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }

    /**
     * 
     * @param token - string token
     * @param secretKey - secretKey
     * @returns - return hasil verifikasi
     */
    public verifyToken = (token: string, secretKey: jwt.Secret): string | jwt.JwtPayload | null =>
    {
        try {
            return jwt.verify(token, secretKey);
        } catch (err) {
            console.error(`token verification failed: ${err instanceof Error ? err.message : 'unknown error'}`);
            return null;
        }
    }
}