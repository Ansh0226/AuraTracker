import React from 'react'
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello Developers good morning!
      </h1>
      Login page
      <GoogleLogin />
    </div>
  );
}

export default Login
