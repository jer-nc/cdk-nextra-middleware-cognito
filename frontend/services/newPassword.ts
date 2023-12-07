const isProduction = process.env.NODE_ENV === 'production';

export const newPassword = async (newPassword: string) => {

    const apiUrl = isProduction ? process.env.NEXT_PUBLIC_PROD_API_SIGNIN_URL : 'http://localhost:3000/api/session/new-password';

    // console.log('apiUrl:', apiUrl)

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPassword),
        });

        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            // console.log('Response:', data);
            return { status: 'success', data };
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
            return { status: 'error', message: errorData.message , error: errorData.error};
        }
    } catch (error) {
        console.error('Error:', error);
        return error
    }
};