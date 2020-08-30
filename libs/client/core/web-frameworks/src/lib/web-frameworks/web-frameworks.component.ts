import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'nartc-web-frameworks',
  templateUrl: './web-frameworks.component.html',
  styleUrls: ['./web-frameworks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebFrameworksComponent implements OnInit {
  // center = new google.maps.LatLng(39.8283459, -98.5794797);
  chartData = [
    {
      name: 'Angular',
      value: 500,
    },
    {
      name: 'React',
      value: 505,
    },
    {
      name: 'Vue',
      value: 510,
    },
  ].sort((a, b) => b.value - a.value);

  customColors = [
    {
      name: 'Angular',
      value: '#c3042f',
    },
    {
      name: 'React',
      value: '#62dafb',
    },
    {
      name: 'Vue',
      value: '#3fb983',
    },
  ];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    interval(500).subscribe(() => {
      this.random();
      this.cdr.markForCheck();
    });
  }

  random() {
    const randomFramework = Math.floor(Math.random() * 3);
    const randomAdd = Math.floor(Math.random() * 5) + 1;
    this.chartData = this.chartData
      .map((data, index) => {
        if (index === randomFramework) {
          data.value += randomAdd;
        }
        return data;
      })
      .sort((a, b) => b.value - a.value);
  }
}
