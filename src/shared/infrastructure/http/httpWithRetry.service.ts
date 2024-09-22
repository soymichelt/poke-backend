import { HttpModuleOptions } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axiosRetry from 'axios-retry';
import { Observable, from } from 'rxjs';

@Injectable()
export class HttpWithRetryService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create(this.getConfig());

    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: (retryCount: number): number => {
        return retryCount * 3000;
      },
      retryCondition: (error: AxiosError): boolean => {
        return axiosRetry.isNetworkError(error);
      },
    });
  }

  public get axios(): AxiosInstance {
    return this.axiosInstance;
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return from(this.axios.get<T>(url, config));
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return from(this.axios.post<T>(url, data, config));
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return from(this.axios.put<T>(url, data, config));
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return from(this.axios.delete<T>(url, config));
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return from(this.axios.patch<T>(url, data, config));
  }

  public head<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return from(this.axios.head<T>(url, config));
  }

  public request<T = any>(
    config: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return from(this.axios.request<T>(config));
  }

  protected getConfig(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
    };
  }
}
