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
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const fromList = this.route.snapshot.queryParamMap.get('fromList');

    if (fromList) {
      this.volverUrl = `/lista/${fromList}`;
    }

    if (id) {
      this.apiService.getCancion(Number(id)).subscribe(data => {
        this.cancion = data;
        this.sections = [
          { name: 'Introducción', content: data.introduccion || '', open: true },
          { name: 'Letra y acordes', content: data.letra1 || '', open: true },
          { name: 'Interludio', content: data.interludio || '', open: true },
          { name: 'Letra y acordes', content: data.letra2 || '', open: true },
          { name: 'Final', content: data.final || '', open: true },
        ];
      });
    }
  }
}
