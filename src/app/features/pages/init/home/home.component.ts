import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';

import {
  Subject
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy {
  /**
   * Stream para el component destroyed
   */
  componentDestroyed$: Subject<void> = new Subject<void>();
  /** Imagen */
  imagefile!: File | null;
  /**
   * Constructor del showcase
   */
  constructor() { }
  /**
   * Obtiene el archivo seleccionado
   */
  getFile(event: File) {
    console.log('\n FILE selected', event);
    this.imagefile = event;
  }
  /**
   * Reiniciar
   */
  restart() {
    this.imagefile = null;
  }
  /**
   * Archivo modificado
   * @param event
   */
  getModifiedImage(event: any) {
    console.log('\n FILE modified', event);
  }
  /**
   * Component on destroy
   */
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
