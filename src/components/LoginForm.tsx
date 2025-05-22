import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', formData);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setFormData({ email: '', password: '' });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div>
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
          className="w-full border-3 py-2 rounded hover:bg-yellow-200 dark:hover:bg-gray-800 focus-visible:bg-yellow-2  00 dark:focus-visible:bg-gray-700"
        >
          Login
        </button>
      </form>
      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
    </div>
  );
};

export default LoginForm;
