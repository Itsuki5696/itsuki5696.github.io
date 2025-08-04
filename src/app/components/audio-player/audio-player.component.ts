import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';
import Plyr from 'plyr';
import { GroupByAlbum } from '../../services/media.service';

@Component({
  selector: 'app-audio-player',
  imports: [GroupByAlbum, RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, FormsModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent implements OnInit {
  @Input() src: string = "";
  @Input() play: boolean = false;

  ngOnInit(): void {
    this.translate.get('plyr').subscribe(data => {
      const player = new Plyr('#audio-player', {
        i18n: data,
        mediaMetadata: {
          title: this.src.split(".")[-2]
        },
      });
      if (this.play) {
        player.play();
      }
    });
  }

  constructor(private translate: TranslateService) {

  }
}
