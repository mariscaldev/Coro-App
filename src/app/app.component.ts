import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  musicalNotes,
  musicalNotesSharp,
  list,
  settings,
  arrowBackCircle,
  chevronDown,
  chevronUp
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Canciones', url: '/canciones', icon: 'musical-notes' },
    { title: 'Lista Semanal', url: '/listas', icon: 'list' },
  ];

  constructor() {
    addIcons({
      musicalNotes,
      musicalNotesSharp,
      list,
      settings,
      arrowBackCircle,
      chevronDown,
      chevronUp,
    });
  }
}
