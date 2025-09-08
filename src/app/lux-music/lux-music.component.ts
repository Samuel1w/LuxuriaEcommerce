import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-lux-music',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './lux-music.component.html',
  styleUrl: './lux-music.component.css'
})
export class LuxMusicComponent {

}
