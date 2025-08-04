import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-lightnovel',
  imports: [RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, AudioPlayerComponent],
  templateUrl: './lightnovel.component.html',
  styleUrl: './lightnovel.component.css'
})
export class LightnovelComponent {

}
