import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  musicalNotesOutline,
  musicalNotesSharp,
  listOutline,
  settingsOutline,
  arrowBackCircleOutline,
  chevronDownOutline,
  chevronUpOutline
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
    { title: 'Canciones', url: '/canciones', icon: 'musical-notes-outline' },
    { title: 'Lista Semanal', url: '/listas', icon: 'list-outline' },
  ];

  constructor() {
    addIcons({
      musicalNotesOutline,
      musicalNotesSharp,
      listOutline,
      settingsOutline,
      arrowBackCircleOutline,
      chevronDownOutline,
      chevronUpOutline,
    });
  }
}
