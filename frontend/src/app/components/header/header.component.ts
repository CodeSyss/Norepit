import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    // Propiedad para rastrear el estado del menú móvil (inicia cerrado)
    isMobileMenuOpen: boolean = false;

    constructor() { }
  
    // Método para cambiar el estado del menú (llamado desde el HTML)
    toggleMobileMenu(): void {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  
}

