import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { ClientCoreDynamicDialogModule } from '@nartc/client/core/dynamic-dialog';
import { BarChartModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './components/chart/chart.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { SettingsComponent } from './dialogs/settings/settings.component';
import { webFrameworksRoutes } from './web-frameworks.routes';
import { WebFrameworksComponent } from './web-frameworks/web-frameworks.component';
import { SettingsInputComponent } from './dialogs/settings/settings-input/settings-input.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(webFrameworksRoutes),
    GoogleMapsModule,
    BarChartModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    ReactiveFormsModule,
    ClientCoreDynamicDialogModule,
  ],
  declarations: [
    WebFrameworksComponent,
    ChartComponent,
    ListComponent,
    MapComponent,
    SettingsComponent,
    SettingsInputComponent,
  ],
})
export class ClientCoreWebFrameworksModule {}
