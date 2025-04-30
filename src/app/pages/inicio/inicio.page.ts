import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ]
})
export class InicioPage {

  constructor(private router: Router) {}

  goToHome() {
    const content = document.querySelector('ion-content');
    if (content) {
      content.classList.add('fade-out'); // Agrega clase para animación
    }

    setTimeout(() => {
      this.router.navigateByUrl('/canciones', { replaceUrl: true });
    }, 500);
  }
}
