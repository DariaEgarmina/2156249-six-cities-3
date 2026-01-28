import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const';
import { UserData } from '@/types/user-data';
import { AuthData } from '@/types/auth-data';
import { saveToken, dropToken } from '@/services/token';

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    extra: AxiosInstance;
  }
>('auth/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    extra: AxiosInstance;
  }
>('auth/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>('auth/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
