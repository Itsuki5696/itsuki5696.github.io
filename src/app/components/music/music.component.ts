import { Component } from '@angular/core';
import { GroupByAlbum, Media, MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-music',
  imports: [GroupByAlbum, RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  musicList: Media[];
  constructor(private mediaService: MediaService) {
    this.musicList = mediaService.musicList;
  }
}
