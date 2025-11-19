import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../utils/supabaseClient';
import { DarkModeToggle } from './DarkModeToggle';

type AuthFormProps = {
  mode: 'login' | 'signup'
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    let result;
    if (mode === 'login') {
      result = await supabase.auth.signInWithPassword(formData);
    } else {
      result = await supabase.auth.signUp(formData);
      console.log(result)
    }

    if (result.error) {
      setError(result.error.message);
    }
  };

  return (
    <div>
      <DarkModeToggle />
      <form onSubmit={handleSubmit} className="p-8 border-3 rounded w-full">
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="
                      w-full 
                      border-3 
                      py-2 
                      mt-2 
                      rounded 
                      hover:bg-yellow-200 
                      focus-visible:bg-yellow-200 
                      dark:hover:bg-gray-800 
                      dark:focus-visible:bg-gray-700
                      transition-colors
                    "
        >
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </button>
      </form>

      <div className="p-3 flex flex-col items-center gap-3">
        <p>Or sign up with</p>
        <div className="flex gap-4">
          <button
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: 'github' })
            }
            className="p-2 rounded-full transition-transform hover:scale-105"
          >
            <img
              src="/social_icons/001-github.png"
              alt="GitHub"
              className="h-8 w-8 dark:invert"
            />
          </button>

          <button
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: 'google' })
            }
            className="p-2 rounded-full transition-transform hover:scale-105"
          >
            <img
              src="/social_icons/002-google.png"
              alt="Google"
              className="h-8 w-8"
            />
          </button>

          <button
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: 'facebook' })
            }
            className="p-2 rounded-full transition-transform hover:scale-105"
          >
            <img
              src="/social_icons/003-facebook.png"
              alt="Facebook"
              className="h-8 w-8"
            />
          </button>
        </div>
      </div>





      <p
        className="
    mt-2 
    text-lg 
    text-center 
    text-red-600 
    dark:text-red-400 
    min-h-[1.5rem]   /* reserve space for one line */
  "
      >
        {error}
      </p>
    </div>
  );
};

export default AuthForm;
