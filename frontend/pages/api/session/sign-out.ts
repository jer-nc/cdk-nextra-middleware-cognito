import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader('Set-Cookie', [
        cookie.serialize('accessToken', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
        }),
        cookie.serialize('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
        }),
    ]);


    // res.setHeader('Cache-Control', 'no-store')

    res.status(200).json({ message: 'Logout successful' });
}
