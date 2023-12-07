import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../../../UserPool';
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const newPassword = req.body;

    const cookies = cookie.parse(req.headers.cookie || '');

    const username = cookies.username; 
    const oldPassword = cookies.tmp_pwd;

    console.log('New Password:', newPassword);
    console.log('Username:', username);
    console.log('Old Password:', oldPassword);

    const authenticationData = {
        Username: username,
        Password: oldPassword
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function () {
            // Not necessary code - review later (always need to change password)
            cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
                onSuccess: function () {
                    res.status(200).json({ message: 'Password changed successfully' });
                },
                onFailure: function (err) {
                    console.error('Error completing new password challenge:', err);
                    res.status(400).json({ message: 'Error completing new password challenge 1', error: err.message });
                }
            });
        },
        onFailure: function (err) {
            console.error('Error authenticating user:', err);
            res.status(401).json({ message: 'Error authenticating user', error: err.message });
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
            delete userAttributes.email_verified;
            delete userAttributes.email;

            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
                onSuccess: function () {
                    res.setHeader('Set-Cookie', [
                        cookie.serialize('tmp_pwd', '', {
                            httpOnly: true,
                            expires: new Date(0),
                            sameSite: 'strict',
                            path: '/',
                        }),
                        cookie.serialize('username', '', {
                            httpOnly: true,
                            expires: new Date(0),
                            sameSite: 'strict',
                            path: '/',
                        }),
                    ]);
                    res.status(200).json({ message: 'Password changed successfully' });
                },
                onFailure: function (err) {
                    res.status(400).json({ message: 'Error completing new password challenge 2', error: err.message });
                }
            });
        }
    });
}
