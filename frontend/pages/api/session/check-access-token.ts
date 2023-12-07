
import { NextApiRequest, NextApiResponse } from "next";
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const userPoolId = process.env.USERPOOL_ID;
const clientId = process.env.USERPOOL_CLIENT_ID;

console.log('userPoolId from api check', userPoolId)

if (!userPoolId || !clientId) {
    throw new Error("USERPOOL_ID or USERPOOL_CLIENT_ID is not defined");
}

const verifier = CognitoJwtVerifier.create({
    userPoolId: userPoolId,
    tokenUse: "access",
    clientId: clientId,
});



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const accessToken = req.body;

    // console.log('accessToken from api', accessToken)

    try {
        if (accessToken) {
            const jwt = await verifier.verify(accessToken, 'access' as string);
            console.log('jwt info from api check', jwt);
            // res.setHeader('Cache-Control', 'no-store')
            res.status(200).json({ message: 'Access token is valid', valid: true });
        } else {
            console.error('Access token is null');
            // res.setHeader('Cache-Control', 'no-store')
            res.status(401).json({ message: 'Access token is not valid', valid: false });
        }
    } catch (error) {
        console.error('Invalid token:', error);
        // res.setHeader('Cache-Control', 'no-store')
        res.status(401).json({ message: 'Access token is not valid' });
    }

}