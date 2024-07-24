import React, { useState } from 'react'
import {GoogleLogin} from '@react-oauth/google' 
import {jwtDecode} from 'jwt-decode' 
import { LoginUser } from '../../ApiServices/services';
import {useDispatch} from 'react-redux'
import { changeAuthMode } from '../../Redux/AuthSlice'; 
import {useNavigate} from 'react-router-dom'


function Login() { 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    function handleSubmit() {

    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-meium mb-4">Signin With Google</h2>
        <div className="">
          <GoogleLogin
            onSuccess={credentialResponse => {
              const cred_api = (jwtDecode(credentialResponse.credential)); 
              LoginUser(cred_api.sub, cred_api.email).then((res) => {
                console.log(res.data) 
                dispatch(changeAuthMode(res.data))
                localStorage.setItem('refresh', res.data.refresh); 
                localStorage.setItem('access', res.data.access);
                navigate('/')
              })
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          </div>
      </div> 
      </div>
      
  )
}

export default Login