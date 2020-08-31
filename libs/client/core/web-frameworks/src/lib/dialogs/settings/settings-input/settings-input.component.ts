import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'nartc-settings-input',
  templateUrl: './settings-input.component.html',
  styleUrls: ['./settings-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsInputComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() control: FormControl;
}
