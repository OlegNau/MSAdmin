import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { LayoutComponent } from './components/layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { StubComponent } from './components/stub/stub.component';
import { SkeletonDirective } from './directives/skeleton/skeleton.directive';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    LayoutComponent,
    StubComponent,
    ToastComponent,
    SkeletonDirective,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,

    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    LayoutComponent,
    StubComponent,
    ToastComponent,
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    SkeletonDirective,

    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SharedModule {
}
