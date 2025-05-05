import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.page.html',
  styleUrls: ['./canciones.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent
  ]
})
export class CancionesPage implements OnInit {
  trackBySongId(index: number, song: any): number {
    return song.id;
  }
  songs: any[] = [];
  filteredSongs: any[] = [];
  searchTerm: string = '';
  loading = true;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando canciones...',
      spinner: 'circles',
      cssClass: 'custom-loading'
    });
  
    await loading.present();
  
    this.apiService.getCanciones().subscribe({
      next: (data) => {
        this.songs = data.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
        this.filteredSongs = this.songs;
        loading.dismiss().then(() => this.loading = false); // <-- AQUÍ
      },
      error: (error) => {
        console.error('Error cargando canciones:', error);
        loading.dismiss().then(() => this.loading = false); // <-- TAMBIÉN AQUÍ
      }
    });
  }

  filterSongs() {
    const term = this.removeDiacritics(this.searchTerm.toLowerCase());

    this.filteredSongs = this.songs.filter(song => {
      const nombreNormalizado = this.removeDiacritics(song.nombre.toLowerCase());
      return nombreNormalizado.includes(term);
    });
  }

  openSongPage(id: number) {
    // Scroll hacia arriba antes de navegar (más elegante)
    const content = document.querySelector('ion-content');
    if (content) {
      (content as HTMLIonContentElement).scrollToTop(300); // 300ms scroll up
    }

    setTimeout(() => {
      this.router.navigate(['/cancion', id]);
    }, 200); // Espera breve para ver el efecto
  }

  removeDiacritics(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}