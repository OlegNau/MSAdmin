import type { TriggerTypeDto } from './dtos/models';
import { Injectable } from '@angular/core';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

@Injectable({
  providedIn: 'root',
})
export class TriggerTypeService {
  apiName = 'Default';

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TriggerTypeDto>>(
      {
        method: 'GET',
        url: '/api/app/trigger-type',
        params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
