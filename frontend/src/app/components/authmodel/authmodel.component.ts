// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-authmodel',
//   imports: [],
//   templateUrl: './authmodel.component.html',
//   styleUrl: './authmodel.component.css'
// })
// export class AuthmodelComponent {

// }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf

@Component({
  selector: 'app-authmodel', // Nombre que usarás en otras plantillas: <app-auth-modal>
  standalone: true,          // Indica que es un componente standalone (Angular 14+)
  imports: [CommonModule],   // Importa CommonModule para usar directivas como *ngIf
  templateUrl: './authmodel.component.html', // Enlaza al archivo HTML de la plantilla
})
export class AuthModalComponent {
  /**
   * Input property to control the visibility of the modal.
   * Set to true by the parent component to show the modal.
   * Recibe si el modal debe mostrarse o no desde el componente padre.
   */
  @Input() showModal: boolean = false;

  /**
   * Output event emitter for closing the modal.
   * Notifies the parent component that the close button was clicked.
   * Emite un evento cuando se hace clic en el botón 'Cerrar'.
   */
  @Output() closeModal = new EventEmitter<void>();

  /**
   * Output event emitter for navigating to the registration page.
   * Notifies the parent component that the register button was clicked.
   * Emite un evento cuando se hace clic en el botón 'Registrarse'.
   */
  @Output() navigateToRegister = new EventEmitter<void>();

  /**
   * Method called when the close button or the overlay is clicked.
   * Emits the closeModal event.
   * Método llamado al hacer clic en 'Cerrar' o en el fondo oscuro.
   */
  onClose() {
    this.closeModal.emit();
  }

  /**
   * Method called when the register button is clicked.
   * Emits the navigateToRegister event and then closes the modal.
   * Método llamado al hacer clic en 'Registrarse'. Emite el evento y luego cierra el modal.
   */
  onRegister() {
    this.navigateToRegister.emit();
    // Opcionalmente, puedes decidir si cerrar el modal aquí o dejar que el padre lo haga
    // this.onClose();
  }

  /**
   * Handles clicks on the modal overlay (background).
   * If the click is directly on the overlay (not the content), it closes the modal.
   * Maneja clics en el fondo oscuro. Si el clic es directo en el overlay, cierra el modal.
   * @param event The mouse click event.
   */
  onOverlayClick(event: MouseEvent) {
    // Comprueba si el objetivo del evento es el propio elemento overlay
    if ((event.target as HTMLElement).classList.contains('modal-overlay-target')) {
      this.onClose();
    }
  }
}



// import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
// <app-auth-modal
//     [showModal]="variableQueControlaVisibilidad"
//     (closeModal)="metodoParaCerrar()"
//     (navigateToRegister)="metodoParaNavegarRegistro()">
// </app-auth-modal>s