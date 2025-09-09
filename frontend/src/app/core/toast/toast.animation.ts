import { animate, style, transition, trigger } from '@angular/animations';

export const toastAnimation = [
  trigger('toastFadeIn', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateY(calc(100% - 1rem))' }),
      animate('0.2s ease-out', style({ opacity: '1', transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
      style({ opacity: '1' }),
      animate('0.2s ease-out', style({ opacity: '0' })),
    ]),
  ]),
];
