import type { AiModelDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiModelService {
  apiName = 'Default';
  

  create = (input: AiModelDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiModelDto>({
      method: 'POST',
      url: '/api/app/ai-model',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/ai-model/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiModelDto>({
      method: 'GET',
      url: `/api/app/ai-model/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AiModelDto>>({
      method: 'GET',
      url: '/api/app/ai-model',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: AiModelDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiModelDto>({
      method: 'PUT',
      url: `/api/app/ai-model/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
