import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
    <app-toast />
  `,
})
export class AppComponent {
}
