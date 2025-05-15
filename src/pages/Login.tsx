import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-start">
        <h1 className="text-6xl">
          MOO
          <span className="text-yellow-500 dark:text-yellow-300">Duck</span>
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
