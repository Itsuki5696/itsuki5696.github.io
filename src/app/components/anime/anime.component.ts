import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { GroupByAlbum } from '../../services/media.service';

@Component({
  selector: 'app-anime',
  imports: [GroupByAlbum, RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, FormsModule],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css'
})
export class AnimeComponent {

}
