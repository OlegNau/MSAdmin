export type ToastType = 'success' | 'error';

const TOAST_DEFAULT_DURATION: number = 5000;

export interface ToastOptions {
  message: string;
  title?: string;
  duration?: number;
}

export class Toast implements ToastOptions {
  public type: string;
  public id: number;
  public message: string;
  public title?: string;
  public duration?: number;

  constructor(type: ToastType, options: ToastOptions) {
    this.type = type;
    this.id = Math.round(Math.random() * 100000);
    this.message = options.message;
    this.title = options.title;
    this.duration = options.duration || TOAST_DEFAULT_DURATION;
  }
}
