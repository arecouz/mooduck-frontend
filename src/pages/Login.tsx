import { DarkModeToggle } from "../components/DarkModeToggle";
import LoginCard from "../components/LoginCard";

const Login = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <h1 className='text-6xl'>
        MOO
        <span className='text-yellow-500 dark:text-yellow-300'>Duck</span>
      </h1>
      <DarkModeToggle />
      <LoginCard />
    </div>
  );
};
export default Login;
