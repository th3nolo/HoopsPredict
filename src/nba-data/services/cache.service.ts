import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class ApiCacheService {
  constructor(@Inject('CACHE_MANAGER') private readonly cache: Cache) {}

  async getDataFromApi<T>(
    cacheKey: string,
    apiUrl: string,
    headers: any
  ): Promise<T> {
    const cachedData = await this.cache.get(cacheKey);
    if (cachedData) {
      return cachedData as T;
    }

    const response = await axios.get(apiUrl, { headers });
    const data: T = response.data;

    await this.cache.set(cacheKey, data);
    return data;
  }
}
