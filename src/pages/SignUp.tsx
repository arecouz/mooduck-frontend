import Cell from "../components/habit/Cell";
import AuthForm from "../components/AuthForm";


const SignUp = () => {
    
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="flex flex-row space-x-8 mb-8">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">1. Sign Up</p>
                    <Cell />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">2. Add your habit.</p>
                    <Cell />
                </div>
            </div>
            <div className="w-full max-w-md rounded-xl p-6 flex flex-col items-center">
                <AuthForm mode="signup"/>
            </div>
        </div>
    );
};

export default SignUp;
