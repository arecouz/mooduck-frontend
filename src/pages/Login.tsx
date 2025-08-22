import { useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate('/signup'); 
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col w-full max-w-md px-4">
        <div className="flex flex-row justify-between items-end w-full">
          <Brand />
          <button
            onClick={handleSignupRedirect}
            className="text-blue-500 hover:underline"
          >
            Sign Up?
          </button>
        </div>
        <AuthForm mode='login'/>
      </div>
    </div>
  );
};

export default Login;
