
const isProduction = process.env.NODE_ENV === 'production';


export const isAuthenticated = async (accessToken: string | null): Promise<boolean> => {
    try {
        if (!accessToken) {
            console.error('Access token is null');
            return false;
        }

        const apiUrl = isProduction
            ? process.env.NEXT_PUBLIC_PROD_API_CHECK_ACCESS_TOKEN_URL
            : 'http://localhost:3000/api/session/check-access-token'; 

        console.log('apiUrl', apiUrl)

        const res = await fetch(apiUrl, {
            cache: 'no-store',
            method: 'POST',
            body: accessToken,
        });

        if (!res.ok) {
            console.error('Error:', res.statusText);
            return false;
        }

        const data = await res.json();
        console.log('Data from check:', data);

        return data.valid || false;

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};


export const renewSession = async (refreshToken: string | null): Promise<string | null> => {
    try {
        if (refreshToken) {
            const apiUrl = isProduction
                ? process.env.NEXT_PUBLIC_PROD_API_RENEW_SESSION_URL 
                : 'http://localhost:3000/api/session/renew-session';

            console.log('apiUrl', apiUrl)

            const res = await fetch(apiUrl, {
                cache: 'no-store',
                method: 'POST',
                body: refreshToken,
            });

            // console.log('res', res)
            const data = await res.json();
            console.log('Data from renew:', data);

            if (data.newAccessToken) {
                console.log('New access token:', data.newAccessToken)
                return data.newAccessToken;
            } else {
                return null;
            }
        } else {
            console.error('Refresh token is null');
            return null;
        }
    } catch (error) {
        console.error('Error while renewing token:', error);
        return null;
    }
};