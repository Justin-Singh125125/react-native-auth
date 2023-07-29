import { useEffect } from 'react';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { api } from '../../../../api';
import { UseApiInterceptorProps } from './useApiInterceptor.types';

export const useApiInterceptor = ({
  tokenResponse,
  signout,
  refreshTokenConcurrently,
}: UseApiInterceptorProps) => {
  useEffect(() => {
    if (tokenResponse) {
      api.setDefaultAccessToken(tokenResponse.accessToken);

      const requestInterceptor = api.instance.interceptors.request.use((config) => {
        api.setConfigAccessToken(config, tokenResponse.accessToken);
        return config;
      });

      const responseInterceptor = api.instance.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error: AxiosError) => {
          const originalRequestConfig = error.config;

          if (
            originalRequestConfig &&
            error.response?.status === 401 &&
            !originalRequestConfig._retry
          ) {
            originalRequestConfig._retry = true;

            try {
              const { accessToken } = await refreshTokenConcurrently(tokenResponse);

              api.setConfigAccessToken(originalRequestConfig, accessToken);

              return api.instance(originalRequestConfig);
            } catch (refreshError) {
              await signout();
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
    }
  }, [tokenResponse, signout]);
};
