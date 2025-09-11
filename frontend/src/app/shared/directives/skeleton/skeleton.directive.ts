import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input, inject } from '@angular/core';

function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

@Directive({
  selector: '[appSkeleton]',
  standalone: true,
})
export class SkeletonDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private resizeObserver!: ResizeObserver;
  private _show = false;

  @Input()
  set appSkeleton(value: boolean | string | null | undefined) {
    this._show = coerceBooleanProperty(value);
    this.toggle();
  }

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(() => this.applyBoxSize());
    this.resizeObserver.observe(this.el.nativeElement);
    this.toggle();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.removeSkeletonStyles();
  }

  private toggle() {
    if (this._show) {
      this.applyBoxSize();
      this.renderer.addClass(this.el.nativeElement, 'skeleton');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'skeleton');
      this.removeSkeletonStyles();
    }
  }

  private applyBoxSize() {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    this.renderer.setStyle(host, 'min-width', `${rect.width}px`);
    this.renderer.setStyle(host, 'min-height', `${rect.height}px`);
  }

  private removeSkeletonStyles() {
    const host = this.el.nativeElement;
    this.renderer.removeStyle(host, 'min-width');
    this.renderer.removeStyle(host, 'min-height');
  }
}
