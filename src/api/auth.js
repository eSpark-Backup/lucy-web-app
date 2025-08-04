import axios from 'axios';

const BASE_URL = 'https://lucyweb-be.stg.esparkconsultants.com/dev/api/v1/'; 

export const signInApi = async (data) => {
  const response = await axios.post(`${BASE_URL}auth/sign-in`, {
    email: data.email,
    password: data.password,
  });
  return response.data;
};

export const signUpApi = async (data) => {
  const response = await axios.post(`${BASE_URL}auth/sign-up`, {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
    acceptTerms: data.terms,
  });
  return response.data;
};


export const forgetPasswordApi = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/forget`, {
    email: data.email,
  });
  return response.data;
};
