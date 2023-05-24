import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { HandleImageCropperComponent } from './components/handle-image-cropper/handle-image-cropper.component';
import { ImageDropzoneComponent } from './components/image-dropzone/image-dropzone.component';


@NgModule({
  declarations: [
    HandleImageCropperComponent,
    ImageDropzoneComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    HandleImageCropperComponent,
    ImageDropzoneComponent
  ]
})
export class HandleImageModule { }
