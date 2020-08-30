import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartCustomColor, ChartResult } from '@nartc/client/models';

@Component({
  selector: 'nartc-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  @Input() results: ChartResult[];
  @Input() customColors: ChartCustomColor[];

  constructor() {}

  ngOnInit(): void {}
}
