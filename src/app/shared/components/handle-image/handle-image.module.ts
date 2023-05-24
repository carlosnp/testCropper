import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandleImageCropperComponent } from './components/handle-image-cropper/handle-image-cropper.component';
import { ImageDropzoneComponent } from './components/image-dropzone/image-dropzone.component';



@NgModule({
  declarations: [
    HandleImageCropperComponent,
    ImageDropzoneComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HandleImageCropperComponent,
    ImageDropzoneComponent
  ]
})
export class HandleImageModule { }
