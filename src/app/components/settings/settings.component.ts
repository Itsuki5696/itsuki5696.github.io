import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  Version: string = "";
  CompileDate: string = "";
  Branch: string = "";
  colorPreference: number = localStorage["colorPreference"] ?? 0;
  fontSize: number = localStorage["fontSize"] ? localStorage["fontSize"] : 0;
  highContrast: number = localStorage["highContrast"] ? localStorage["highContrast"] : 1;
  constructor() { }

  ngOnInit(): void {
    this.Version = AppComponent.Version;
    this.CompileDate = AppComponent.CompileDate;
    this.Branch = AppComponent.Branch;

    this.setColorTheme();
    this.setContrast();
    document.body.style.fontSize = ((this.fontSize / 20 + 1) * 100).toFixed(0) + '%';
  }

  setColorTheme(): void {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && this.colorPreference == 0 || this.colorPreference == 2) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else document.documentElement.setAttribute("data-bs-theme", "light");
  }

  setContrast(): void {
    document.body.style.filter = this.highContrast == 2 ? 'contrast(2)' : 'none';
  }

  colorPreferenceChange(): void {
    this.setColorTheme();
    localStorage["colorPreference"] = this.colorPreference;
  }

  fontSizeChange(): void {
    document.body.style.fontSize = ((this.fontSize / 20 + 1) * 100).toFixed(0) + '%';
    localStorage["fontSize"] = this.fontSize;
  }

  contrastChange(): void {
    this.setContrast();
    localStorage["highContrast"] = this.highContrast;
  }
}
