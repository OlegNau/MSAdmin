import type { NodeDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  apiName = 'Default';
  

  create = (input: NodeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NodeDto>({
      method: 'POST',
      url: '/api/app/node',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/node/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NodeDto>({
      method: 'GET',
      url: `/api/app/node/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NodeDto>>({
      method: 'GET',
      url: '/api/app/node',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: NodeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NodeDto>({
      method: 'PUT',
      url: `/api/app/node/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
