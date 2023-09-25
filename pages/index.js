import { signInWithGoogle } from "@/services/auth";
import { Button } from "@mui/material";
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();

    // Per effettuare l'accesso:
    const handleSignIn = async () => {
        await signInWithGoogle();
        router.push('/home');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-cente">
          <div className="bg-white p-4 rounded-xl shadow-lg text-center mx-20">
            <img src="/gymtracker.jpg" alt="gym" className="w-full" />
            <Button onClick={handleSignIn} className="bg-gray-200 py-4 px-4 text-blue-500">Login con Google</Button>
          </div>
        </div>
    )
}

export default Login;