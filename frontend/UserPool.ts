import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js";


const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.USERPOOL_ID || '',
    ClientId: process.env.USERPOOL_CLIENT_ID || ''
}

const userPool = new CognitoUserPool(poolData);
const cognitoUser = userPool.getCurrentUser();

export  { cognitoUser, userPool};