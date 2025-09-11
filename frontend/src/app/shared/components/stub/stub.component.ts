import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STUB_CONFIGS, StubConfig, StubKind } from './stub.model';

@Component({
  selector: 'app-stub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stub.component.html',
  styleUrls: ['./stub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StubComponent {
  @Input({ required: true }) public kind!: StubKind;
  @Input() public overrideConfig?: Partial<StubConfig>;
  @Output() public primary = new EventEmitter<void>();

  public get config(): StubConfig {
    const base = STUB_CONFIGS[this.kind] ?? STUB_CONFIGS.default;
    return { ...base, ...(this.overrideConfig ?? {}) };
  }

  public onPrimaryClick(): void {
    this.primary.emit();
  }
}
