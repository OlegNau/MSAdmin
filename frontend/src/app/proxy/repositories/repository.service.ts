import type { RepositoryDto, ToggleActiveDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  apiName = 'Default';
  

  create = (input: RepositoryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RepositoryDto>({
      method: 'POST',
      url: '/api/app/repository',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/repository/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RepositoryDto>({
      method: 'GET',
      url: `/api/app/repository/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RepositoryDto>>({
      method: 'GET',
      url: '/api/app/repository',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  toggleActiveByIdAndInput = (id: string, input: ToggleActiveDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/repository/${id}/active`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: RepositoryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RepositoryDto>({
      method: 'PUT',
      url: `/api/app/repository/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
