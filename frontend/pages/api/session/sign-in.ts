import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { userPool } from '../../../UserPool';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password } = req.body;

    console.log('username from api', email)
    console.log('password from api', password)

    const authenticationData = {
        Username: email,
        Password: password
    };

    // console.log('authenticationData', authenticationData)

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
        Username: email,
        Pool: userPool
    };

    // console.log('userData', userData)
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
            // res.setHeader('Cache-Control', 'no-store')
            res.status(401).json({ message: 'Authentication failed', error: err });
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
            // res.setHeader('Cache-Control', 'no-store')
            res.status(200).json({ message: 'New password required' });
        }
    });
}
