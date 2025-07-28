import { Component, Input, OnInit } from '@angular/core';
import Plyr from 'plyr';

@Component({
  selector: 'app-audio-player',
  imports: [],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent implements OnInit {
  @Input() src: string = "";

  ngOnInit(): void {
      const player = new Plyr('#audio-player');
  }
}
