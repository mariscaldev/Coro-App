import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonicModule } from '@ionic/angular'; // << Importa todo Ionic de una sola vez
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ⬅️ ESTA ES LA CORRECTA
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations'; // 👈 Para animaciones
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  imports: [IonicModule, CommonModule, NgIf, NgForOf, FormsModule, NavbarComponent // 👈 Agrega NgModel
  ]

})
export class ListasPage implements OnInit {
  listas: any[] = [];
  filteredListas: any[] = [];
  searchTerm: string = '';
  loading = true;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getListas().subscribe({
      next: (data) => {
        // 👉 Filtrar solo listas activas (estado === true)
        const listasActivas = data.filter((lista: any) => lista.estado === true);

        this.listas = listasActivas.sort((a: any, b: any) =>
          a.nombre.localeCompare(b.nombre)
        );
        this.filteredListas = this.listas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando listas:', error);
        this.loading = false;
      }
    });
  }

  filterListas() {
    const term = this.removeDiacritics(this.searchTerm.toLowerCase());

    this.filteredListas = this.listas.filter(lista => {
      const nombreNormalizado = this.removeDiacritics(lista.nombre.toLowerCase());
      return nombreNormalizado.includes(term);
    });
  }

  removeDiacritics(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  verLista(id: number) {
    const content = document.querySelector('ion-content');
    if (content) {
      (content as HTMLIonContentElement).scrollToTop(300);
    }

    setTimeout(() => {
      this.router.navigate(['/lista', id]);
    }, 200);
  }

  refrescar(event: any) {
    this.apiService.getListas().subscribe({
      next: (data) => {
        const listasActivas = data.filter((lista: any) => lista.estado === true);

        this.listas = listasActivas.sort((a: any, b: any) =>
          a.nombre.localeCompare(b.nombre)
        );
        this.filteredListas = this.listas;
        event.target.complete(); // ✅ Finaliza la animación del refresher
      },
      error: (error) => {
        console.error('Error actualizando listas:', error);
        event.target.complete(); // ❗️Asegúrate de finalizar también en caso de error
      }
    });
  }


}