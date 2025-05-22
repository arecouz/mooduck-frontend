import Brand from '../components/Brand';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-start">
        <Brand />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
