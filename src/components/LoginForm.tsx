import { useState, ChangeEvent } from 'react';

const LoginForm = () =>  {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // API call to auth, and poss a redirect
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-8 border-3 rounded w-full'
    >
      <div className='mb-4'>
        <label htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full border-2 px-3 py-2 rounded'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='password'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          value={formData.password}
          onChange={handleChange}
          className='w-full border-2 px-3 py-2 rounded'
          required
        />
      </div>
      <button
        type='submit'
        className='w-full border-3 py-2 rounded hover:bg-yellow-200 dark:hover:bg-gray-800'
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
