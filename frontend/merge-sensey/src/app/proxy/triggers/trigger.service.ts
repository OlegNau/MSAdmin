import type { TriggerDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TriggerService {
  apiName = 'Default';
  

  create = (input: TriggerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TriggerDto>({
      method: 'POST',
      url: '/api/app/trigger',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/trigger/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TriggerDto>({
      method: 'GET',
      url: `/api/app/trigger/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TriggerDto>>({
      method: 'GET',
      url: '/api/app/trigger',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: TriggerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TriggerDto>({
      method: 'PUT',
      url: `/api/app/trigger/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
