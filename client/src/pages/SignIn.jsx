import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='bg-blue-500 p-3 px-20 py-24 mx-auto flex flex-col lg:flex-row-reverse items-center'>
  
  <div className='lg:w-3/5'>
    <h1 className='text-white text-3xl text-center lg:text-left font-semibold my-7'>Sign In</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='email'
        placeholder='email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'
        onChange={handleChange}
      />

      <button
        disabled={loading}
        className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      <OAuth/>
    </form>
    <div className='flex gap-2 mt-5'>
      <p className='text-white'>Dont have an account?</p>
      <Link to={'/sign-up'}>
        <span className='text-black'>Sign up</span>
      </Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
  </div>
  <div className='lg:w-2/5 flex justify-center lg:justify-start'>
    <img src='https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png' alt='Your Image' className='w-full max-w-sm' />
  </div>
</div>

  );
}
