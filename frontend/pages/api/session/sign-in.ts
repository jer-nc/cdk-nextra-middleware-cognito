import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { userPool } from '../../../UserPool';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, password } = req.body;

        console.log('username from api', email);
        console.log('password from api', password);

        const authenticationData = {
            Username: email,
            Password: password
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: email,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData as any);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const accessToken = result.getAccessToken().getJwtToken();
                const refreshToken = result.getRefreshToken().getToken();
                // Set cookies
                res.setHeader('Set-Cookie', [
                    cookie.serialize('accessToken', accessToken, {
                        httpOnly: true,
                        maxAge: result.getAccessToken().getExpiration() * 1000,
                        sameSite: 'strict',
                        path: '/',
                    }),
                    cookie.serialize('refreshToken', refreshToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        path: '/',
                    }),
                ]);

                // res.setHeader('Cache-Control', 'no-store')

                res.status(200).json({ accessToken, refreshToken })
            },
            onFailure: function (err) {
                console.error('Authentication failed:', err);
                console.error('Error properties:', Object.getOwnPropertyNames(err));
                res.status(401).json({ message: 'Authentication failed', error: err });
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                console.log('newPasswordRequired');
                res.status(200).json({ message: 'New password required', newPasswordRequired: true });
            }
        });
    } catch (error) {
        console.error('Exception occurred:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
