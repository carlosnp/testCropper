import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  Dimensions,
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
  base64ToFile
} from 'ngx-image-cropper';

@Component({
  selector: 'app-handle-image-cropper',
  templateUrl: './handle-image-cropper.component.html',
  styleUrls: ['./handle-image-cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandleImageCropperComponent implements OnDestroy {
  /**
   * Stream para el component destroyed
   */
  componentDestroyed$: Subject<void> = new Subject<void>();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  /**
   * Recibe el archivo desde afuera
   */
  @Input()
  set sourceFile(newFile: File) {
    console.log('\nnewFile', newFile);
    /** Almacenamos el archivo recibido como original*/
    this.imageChangedEvent = newFile;
    this.changeDetectorRef.detectChanges();
  }
  /**
   * Restaurar
   */
  @Output()
  restore: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Referencia al componente de imageCropper
   * para acceder a sus métodos
   */
  @ViewChild(ImageCropperComponent, { static: true })
  cropper!: ImageCropperComponent;
  /**
   * Constructor del componente
   * @param changeDetectorRef
   */
  constructor(private changeDetectorRef: ChangeDetectorRef) { }
  /**
   * Realiza el crop de la imagen
   */
  crop() {
    /** Indicamos al imageCropper que realice el crop */
    this.cropper.crop();
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log('event', event);
    this.croppedImage = event.base64;
    if (event.base64) {
      console.log(event, base64ToFile(event.base64));
    }
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
        ...this.transform,
        rotate: this.rotation
    };
  }
  /**
   * Component on destroy
   */
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
