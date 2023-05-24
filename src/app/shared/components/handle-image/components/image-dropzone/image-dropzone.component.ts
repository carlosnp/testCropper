import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

import {
  Subject
} from 'rxjs';

@Component({
  selector: 'app-image-dropzone',
  templateUrl: './image-dropzone.component.html',
  styleUrls: ['./image-dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDropzoneComponent implements OnDestroy {
  /**
   * Stream para el component destroyed
   */
  componentDestroyed$: Subject<void> = new Subject<void>();
  /**
   * Tipos de mimes aceptadas
   */
  accept = 'image/jpg, image/jpeg, image/png, image/webp';
  /**
   * Pemitir cargar con file input aparte del drop
   */
  @Input() input = true;
  /**
   * Emitir archivo seleccionado
   */
  @Output()
  fileChange: EventEmitter<File> = new EventEmitter<File>();
  /**
   * Hidden file input
   */
  @ViewChild('fileInput') fileInput!: ElementRef;
  /**
   * Permitir drop
   * @param event drag event
   */
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  /**
   * Trigger click en el file input
   */
  openFileInput() {
    if (this.input) { this.fileInput.nativeElement.click(); }
  }
  /**
   * Recibir archivo desde el drop
   * @param event drop event
   */
  dropFile(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer;
    // TODO implementar subir imagen con drop
    // if (data) { this.fileChange.emit(data.files[0]); }
  }
  /**
   * Recibir archivo desde el file input
   * @param event input change event
   */
  inputFile(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) { this.fileChange.emit(files[0]); }
  }
  /**
   * Component on destroy
   */
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
