import { DarkModeToggle } from './components/DarkModeToggle';
import LoginCard from './components/LoginCard';

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Sticky Header */}
      <header className='sticky top-0 z-50 border-b-2 flex bg-yellow-300 dark:bg-gray-800'>
        <div className='flex w-full items-center justify-start gap-8'>
          <h1 className='ml-2 text-4xl font-light'>MooDuck</h1>
          <p className='text-3xl font-bold hover:cursor-pointer'>home</p>
          <p className='text-3xl font-bold hover:cursor-pointer'>log in</p>
          <DarkModeToggle />
        </div>
      </header>

      <main className='flex items-center justify-center flex-1'>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-10 px-4'>
          {/* Text Section */}
          <p className='text-lg leading-relaxed max-w-80'>
            MooDuck is your gateway to seamless quack-based communication.
            Powered by hyper-intuitive algorithms and a splash of chaos, it
            redefines how ducks—and humans—connect. Whether you're syncing
            feathers or syncing calendars, MooDuck keeps your flock in formation
            without breaking a sweat or a wing.
          </p>

          {/* Login Section */}
          <div className='flex flex-col w-100'>
            <p className='text-5xl font-light'>MooDuck</p>
            <LoginCard />
          </div>
        </div>
      </main>

      <footer className='bg-yellow-100 text-gray-500 dark:bg-gray-800 p-3 flex flex-col md:flex-row items-center justify-around text-center text-m gap-2 md:gap-0'>
        <div>
          &copy; {new Date().getFullYear()} MooDuck All rights reserved.
        </div>
        <div className='flex gap-4'>
          <div className='hover:underline hover:cursor-pointer'>
            contact@mooduck.xyz
          </div>
        </div>
        <div className='hover:underline hover:cursor-pointer'>
          Buy me a coffee ☕
        </div>
      </footer>
    </div>
  );
};

export default Layout;
