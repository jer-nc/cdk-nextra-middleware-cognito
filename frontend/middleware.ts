import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated, renewSession } from './services/authVerifier';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname;
    const cookieStore = cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const isNextPath = path.startsWith("/_next");
    const isSignInPath = path === '/api/session/sign-in';
    const isNewPasswordRequiredPath = path === '/auth/new-password';
    const isApiNewPasswordRequiredPath = path === '/api/session/new-password';
    const isRenewSessionPath = path === '/api/session/renew-session' && refreshToken;

    if (isNextPath || isSignInPath || isRenewSessionPath || isApiNewPasswordRequiredPath) {
        return NextResponse.next();
    }

    const redirect = (pathname: string) => {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = pathname;
        const response = NextResponse.redirect(redirectUrl);
        response.headers.set('Cache-Control', 'no-store');
        return response;
    };

    const redirectToSignIn = () => {
        if (path !== '/auth/sign-in') {
            return redirect('/auth/sign-in');
        }
        return NextResponse.next();
    };
    const redirectToHome = () => redirect('/');

    const authenticated = await isAuthenticated(accessToken);

    if (authenticated) {
        // return NextResponse.next();
        if (path === '/auth/sign-in') {
            return redirectToHome();
        }
    }

    if (!authenticated && refreshToken) {
        const newAccessToken = await renewSession(refreshToken);

        if (newAccessToken) {
            const response = NextResponse.next();
            response.cookies.set('accessToken', newAccessToken);
            response.headers.set('Cache-Control', 'no-store');
            return response;
        } else {
            return redirectToSignIn();
        }
    }

    if(!authenticated && path === '/auth/new-password') {
        return NextResponse.next();
    }
    
    if (authenticated && path === '/auth/sign-in' || path === '/auth/new-password') {
        return redirectToHome();
    } else if (!authenticated) {
        return redirectToSignIn();
    }
}
