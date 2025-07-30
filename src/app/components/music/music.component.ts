import { Component } from '@angular/core';
import { GroupByAlbum, Media, MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { FuseResult } from 'fuse.js';

@Component({
  selector: 'app-music',
  imports: [GroupByAlbum, RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, FormsModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  musicList: Media[];
  search: string = "";
  constructor(private mediaService: MediaService) {
    this.musicList = mediaService.musicList;
  }

  onSearchChanged(event: any): void {
    this.search = event.target.value;
    if (!this.search) {
      this.musicList = this.mediaService.musicList;
    } else {
      this.musicList = this.mediaService.search(this.musicList, this.search)
    }

  }
}
