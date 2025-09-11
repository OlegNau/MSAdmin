import type { PipelineDto, PipelineCreateDto, PipelineUpdateDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PipelineService {
  apiName = 'Default';
  

  create = (input: PipelineCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PipelineDto>({
      method: 'POST',
      url: '/api/app/pipeline',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/pipeline/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PipelineDto>({
      method: 'GET',
      url: `/api/app/pipeline/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PipelineDto>>({
      method: 'GET',
      url: '/api/app/pipeline',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: PipelineUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PipelineDto>({
      method: 'PUT',
      url: `/api/app/pipeline/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
