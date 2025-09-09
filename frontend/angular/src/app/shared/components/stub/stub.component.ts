import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StubConfig, StubType } from './stub.model';

@Component({
  standalone: false,
  selector: 'app-stub',
  templateUrl: './stub.component.html',
  styleUrl: './stub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StubComponent {
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public type: StubType = 'empty';

  public readonly stubConfigs: Record<StubType, StubConfig> = {
    empty: { icon: 'inbox', color: '#7B6BFF' },
    error: { icon: 'error_outline', color: '#c00d49' },
    loading: { icon: 'hourglass_empty', color: '#4fbf67' },
    notFound: { icon: 'search_off', color: '#355dff' },
  };
}
