import { useMutation } from '@tanstack/react-query';
import { signInApi, signUpApi, forgetPasswordApi } from '../api/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';


export const useSignIn = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: signInApi,
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user)); 
      localStorage.setItem("token", data.token);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log("Signup success", data);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
  });
};
