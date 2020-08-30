import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { BarChartModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './components/chart/chart.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { webFrameworksRoutes } from './web-frameworks.routes';
import { WebFrameworksComponent } from './web-frameworks/web-frameworks.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(webFrameworksRoutes),
    GoogleMapsModule,
    BarChartModule,
    ScrollingModule,
    ExperimentalScrollingModule,
  ],
  declarations: [
    WebFrameworksComponent,
    ChartComponent,
    ListComponent,
    MapComponent,
  ],
})
export class ClientCoreWebFrameworksModule {}
