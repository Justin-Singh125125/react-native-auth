import { useEffect } from 'react';
import { api } from '../../../../api';
import { UseApiInterceptorProps } from './useApiInterceptor.types';
import { AxiosError } from 'axios';

export const useApiInterceptor = ({
  tokenResponse,
  signout,
  refreshTokenConcurrently,
}: UseApiInterceptorProps) => {
  useEffect(() => {
    api.instance.defaults.headers['Authorization'] = tokenResponse?.accessToken;

    const requestInterceptor = api.instance.interceptors.request.use((config) => {
      config.headers['Authorization'] = tokenResponse?.accessToken;
      return config;
    });

    const responseInterceptor = api.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;
        console.log('hello');

        console.log(!originalRequest?._retry);

        if (originalRequest && error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;

          try {
            if (!tokenResponse) {
              throw new Error('');
            }

            const { accessToken, tokenType } = await refreshTokenConcurrently(tokenResponse);

            console.log(accessToken);

            originalRequest.headers['Authorization'] = accessToken;

            return api.instance(originalRequest);
          } catch (refreshError) {
            signout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.instance.interceptors.request.eject(requestInterceptor);
      api.instance.interceptors.response.eject(responseInterceptor);
    };
  }, [tokenResponse, signout]);
};
