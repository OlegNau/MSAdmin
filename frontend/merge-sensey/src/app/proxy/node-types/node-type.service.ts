import type { NodeTypeDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NodeTypeService {
  apiName = 'Default';
  

  create = (input: NodeTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NodeTypeDto>({
      method: 'POST',
      url: '/api/app/node-type',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/node-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NodeTypeDto>({
      method: 'GET',
      url: `/api/app/node-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NodeTypeDto>>({
      method: 'GET',
      url: '/api/app/node-type',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: NodeTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NodeTypeDto>({
      method: 'PUT',
      url: `/api/app/node-type/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
