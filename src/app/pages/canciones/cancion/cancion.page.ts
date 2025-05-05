import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.page.html',
  styleUrls: ['./cancion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NavbarComponent]
})
export class CancionPage implements OnInit {
  cancion: any;
  volverUrl: string = '/canciones';
  sections: { name: string, content: string, open: boolean }[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const fromList = this.route.snapshot.queryParamMap.get('fromList');

    if (fromList) {
      this.volverUrl = `/lista/${fromList}`;
    }

    if (id) {
      this.apiService.getCancion(Number(id)).subscribe(data => {
        this.cancion = data;

        // ⚙️ Inicializar secciones, pero plegar las vacías
        this.sections = [
          {
            name: 'Introducción',
            content: data.introduccion || '',
            open: !!(data.introduccion && data.introduccion.trim())
          },
          {
            name: 'Letra y acordes',
            content: data.letra1 || '',
            open: !!(data.letra1 && data.letra1.trim())
          },
          {
            name: 'Interludio',
            content: data.interludio || '',
            open: !!(data.interludio && data.interludio.trim())
          },
          {
            name: 'Letra y acordes',
            content: data.letra2 || '',
            open: !!(data.letra2 && data.letra2.trim())
          },
          {
            name: 'Final',
            content: data.final || '',
            open: !!(data.final && data.final.trim())
          }
        ];
      });
    }
  }

}
