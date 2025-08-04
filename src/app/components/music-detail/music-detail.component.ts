import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { AudioPlayerComponent } from "../audio-player/audio-player.component";

@Component({
  selector: 'app-music-detail',
  imports: [RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, AudioPlayerComponent],
  templateUrl: './music-detail.component.html',
  styleUrl: './music-detail.component.css'
})
export class MusicDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mediaSrv = inject(MediaService);
  src: string = "";

  // 1️⃣ 取得路由参数
  album = computed(() => this.route.snapshot.paramMap.get('album') ?? '');

  // 2️⃣ 根据 album 取数据（这里示例返回 sync；真实场景可返回 Observable + async pipe）
  items = computed(() => this.mediaSrv.groupMediaByAlbum(this.mediaSrv.musicList, this.album()));

  musicList = this.items();

  ngOnInit(): void {
    console.log(this.musicList)
  }

  playAudio(src: string): void {
    this.mediaSrv.setAudioSrc(src);
  }
}
