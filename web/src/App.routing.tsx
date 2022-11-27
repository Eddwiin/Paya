import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { PATH } from './core/configs/path.config';
import { AuthentificationContainer } from './pages/authentification/authentification.container';
import { ForgetPassword } from './pages/authentification/forget-password/forget-password';
import { ResetPassword } from './pages/authentification/reset-password/reset-password';
import { SignIn } from './pages/authentification/SignIn/sign-in';
import { SignUp } from './pages/authentification/SignUp/sign-up';
import { Error404 } from './shared/components/error-404';

export const appRouter = createBrowserRouter([
    {
        path: PATH.ROOT,
        element: <App />,
        errorElement: <Error404 />,
        children: [
            {
                path: PATH.AUTH,
                element: <AuthentificationContainer />,
                children: [
                    {
                        path: PATH.SIGNIN,
                        element: <SignIn />
                    },
                    {
                        path: PATH.SIGNUP,
                        element: <SignUp />
                    },
                    {
                        path: PATH.FORGETPASSWORD,
                        element: <ForgetPassword />
                    },
                    {
                        path: PATH.RESETPASSWORD,
                        element: <ResetPassword />
                    }
                ]
            }
        ]
    },
])