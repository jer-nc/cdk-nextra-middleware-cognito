const isProduction = process.env.NODE_ENV === 'production';

export const signIn = async (email : string, password: string) => {

    const apiUrl = isProduction ? process.env.NEXT_PUBLIC_PROD_API_SIGNIN_URL : 'http://localhost:3000/api/session/sign-in';

    // console.log('apiUrl:', apiUrl)

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            // console.log('Response:', data);
            return data;
        } else {
            console.error('Error:', response.statusText);
            return response.statusText
        }
    } catch (error) {
        console.error('Error:', error);
        return error
    }
};