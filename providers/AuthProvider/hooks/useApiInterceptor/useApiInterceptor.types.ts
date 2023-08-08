import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AuthContextProps } from '../../../../context';

export type UseApiInterceptorProps = AuthContextProps;

export type InternalAxiosRequestConfigWithRetry = InternalAxiosRequestConfig & {
  _retry: boolean;
};

export type AxiosErrorWithRetry = Omit<AxiosError, 'config'> & {
  config: InternalAxiosRequestConfigWithRetry;
};
