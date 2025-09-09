import { Directive, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[appSkeleton]',
  standalone: false,
})
export class SkeletonDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  private shouldShowSkeleton = false;
  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.shouldShowSkeleton) this.updateSkeleton();
    });
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  @Input('appSkeleton') set appSkeleton(value: boolean | string) {
    this.shouldShowSkeleton = coerceBooleanProperty(value);
    this.updateSkeleton();
  }

  private updateSkeleton(): void {
    const element = this.elementRef.nativeElement;

    if (this.shouldShowSkeleton) {
      this.renderer.addClass(element, 'skeleton');
      Promise.resolve().then(() => {
        const computedStyles = getComputedStyle(element);
        const widthInRem = this.convertPixelsToRem(computedStyles.width);
        const heightInRem = this.convertPixelsToRem(computedStyles.height);
        const borderRadius = computedStyles.borderRadius || '0.25rem';

        this.renderer.setStyle(element, 'width', widthInRem);
        this.renderer.setStyle(element, 'height', heightInRem);
        this.renderer.setStyle(element, 'border-radius', borderRadius);
        this.renderer.setStyle(element, 'transition', 'all 0.3s ease');
      });
    } else {
      this.renderer.setStyle(element, 'opacity', '0');
      setTimeout(() => {
        this.renderer.removeClass(element, 'skeleton');
        this.renderer.removeStyle(element, 'width');
        this.renderer.removeStyle(element, 'height');
        this.renderer.removeStyle(element, 'border-radius');
        this.renderer.removeStyle(element, 'opacity');
        this.renderer.removeStyle(element, 'transition');
      }, 300);
    }
  }

  private convertPixelsToRem(pixelValue: string): string {
    const numericValue = parseFloat(pixelValue);
    return `${numericValue / 16}rem`;
  }
}
