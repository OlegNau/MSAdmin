import type { TriggerTypeDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TriggerTypeService {
  apiName = 'Default';
  

  create = (input: TriggerTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TriggerTypeDto>({
      method: 'POST',
      url: '/api/app/trigger-type',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/trigger-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TriggerTypeDto>({
      method: 'GET',
      url: `/api/app/trigger-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TriggerTypeDto>>({
      method: 'GET',
      url: '/api/app/trigger-type',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: TriggerTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TriggerTypeDto>({
      method: 'PUT',
      url: `/api/app/trigger-type/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
