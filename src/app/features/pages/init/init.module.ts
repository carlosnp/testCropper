import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { InitRoutingModule } from './init-routing.module';
import { HomeComponent } from './home/home.component';
import { HandleImageModule } from 'src/app/shared/components/handle-image/handle-image.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    InitRoutingModule,
    HandleImageModule,
    MatCardModule
  ]
})
export class InitModule { }
