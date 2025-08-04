import { Component, computed, inject } from '@angular/core';
import { Media, MediaService, GroupByAlbum } from '../../services/media.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-music-artist',
  imports: [RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, AudioPlayerComponent, GroupByAlbum],
  templateUrl: './music-artist.component.html',
  styleUrl: './music-artist.component.css'
})
export class MusicArtistComponent {
  private route = inject(ActivatedRoute);
  private mediaSrv = inject(MediaService);
  src: string = "";

  // 1️⃣ 取得路由参数
  artist = computed(() => this.route.snapshot.paramMap.get('artist') ?? '');

  // 2️⃣ 根据 album 取数据（这里示例返回 sync；真实场景可返回 Observable + async pipe）
  items = computed(() => this.mediaSrv.groupMediaByAuthor(this.mediaSrv.musicList, this.artist()));


  musicList = this.items();
  search: string = "";

  onSearchChanged(event: any): void {
    this.search = event.target.value;
    if (!this.search) {
      this.musicList = this.mediaService.musicList;
    } else {
      this.musicList = this.mediaService.search(this.musicList, this.search)
    }

  }

  constructor(private mediaService: MediaService) {
    console.log(this.artist())
  }
}
