import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    MatCardModule
  ]
})
export class AnalyticsModule { }
