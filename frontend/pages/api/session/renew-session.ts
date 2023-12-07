
import { CognitoRefreshToken, CognitoUser } from "amazon-cognito-identity-js";
import { NextApiRequest, NextApiResponse } from "next";
import { userPool } from "../../../UserPool";

interface RenewTokenResponse {
    newAccessToken: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('req', req.body)
    const refreshToken = req.body;

    const renewToken = async (refreshToken: string): Promise<RenewTokenResponse | null> => {
        const cognitoUser = new CognitoUser({
            Username: '',
            Pool: userPool
        });

        const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

        const promise = new Promise<RenewTokenResponse>((resolve, reject) => {
            cognitoUser.refreshSession(token, (err, session) => {
                if (err) {
                    reject(err);
                } else {
                    const newAccessToken = session.getAccessToken().getJwtToken();
                    // const newRefreshToken = session.getRefreshToken().getToken();
                    resolve({ newAccessToken });
                }
            });
        });

        try {
            const tokenRenewalResult = await promise;
            return tokenRenewalResult;
        } catch (error) {
            console.error('Error while renewing token:', error);
            return null;
        }
    };

    const tokenRenewalResult = await renewToken(refreshToken);

    if (!tokenRenewalResult || !('newAccessToken' in tokenRenewalResult)) {
        // res.setHeader('Cache-Control', 'no-store')
        const response = res.status(401).json({
            message: 'Token renewal failed',
        });
        return response;
    }

    const { newAccessToken } = tokenRenewalResult;

    // res.setHeader('Cache-Control', 'no-store')

    const response = res.status(200).json({
        message: 'ok',
        newAccessToken,
    });

    return response;
}