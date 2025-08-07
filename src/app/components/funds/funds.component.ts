import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { GroupByAlbum } from '../../services/media.service';
import { MonetaryService, GroupByPositionType } from '../../services/monetary.service';

@Component({
  selector: 'app-funds',
  imports: [GroupByAlbum, RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, FormsModule, GroupByPositionType],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css'
})
export class FundsComponent {
  fundsList: any[];
  search: string = "";
  
  constructor(private monetaryService: MonetaryService) {
    this.fundsList = monetaryService.globalPositions;
  }

  onSearchChanged(event: any): void {
    this.search = event.target.value;
    if (!this.search) {
      this.fundsList = this.monetaryService.globalPositions;
    } else {
      this.fundsList = this.monetaryService.search(this.fundsList, this.search)
    }

  }
}
