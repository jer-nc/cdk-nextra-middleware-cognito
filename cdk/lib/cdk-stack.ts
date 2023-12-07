import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createCognitoPool } from './auth/cognitoPool';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPoolClient = createCognitoPool(this, {
      poolName: 'nextra-cognito-pool'
    })

  }
}
