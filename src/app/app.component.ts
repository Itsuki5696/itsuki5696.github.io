import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
  TranslateModule
} from "@ngx-translate/core";
import { PlyrComponent, PlyrModule } from 'ngx-plyr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, NgbModule, TranslateModule, TranslatePipe, TranslateDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'aninextweb';
  tabs: any = [];
  static Version: string = "0.2507.1.0";
  static CompileDate: string = "20250728";
  static Branch: string = "dev"
  colorPreference: number = localStorage["colorPreference"] ? localStorage["colorPreference"] : 0;
  fontSize: number = localStorage["fontSize"] ? localStorage["fontSize"] : 0;
  highContrast: number = localStorage["highContrast"] ? localStorage["highContrast"] : 1;

  constructor(private router: Router, private translate: TranslateService) {
    this.tabs = [
      {
        id: 0,
        text: 'navbar.home',
        symbol: 'fa-home',
        router: ['/'],
      },
      {
        id: 1,
        text: 'navbar.anime',
        symbol: 'fa-video',
        router: ['/anime'],
      },
      {
        id: 2,
        text: 'navbar.music',
        symbol: 'fa-music',
        router: ['/music'],
      },
      {
        id: 3,
        text: 'navbar.lightnovel',
        symbol: 'fa-books',
        router: ['/lightnovel'],
      }
    ];
    this.translate.addLangs(['zh-cn', 'ja-jp', 'en-us']);
    this.translate.setDefaultLang('zh-cn');
    this.translate.use('zh-cn');
  }

  IsPageActive(suburl: string): boolean {
    return suburl == '/' + this.router.url.split('/')[1];
  }

  ngOnInit(): void {
    this.setFontSize();
    this.setColorTheme();
    this.setContrast();
  }

  setFontSize(): void {
    document.body.style.fontSize = ((this.fontSize / 20 + 1) * 100).toFixed(0) + '%';
  }

  setContrast(): void {
    document.body.style.filter = this.highContrast == 2 ? 'contrast(2)' : 'none';
  }

  setColorTheme(): void {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && this.colorPreference == 0 || this.colorPreference == 2) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else document.documentElement.setAttribute("data-bs-theme", "light");
  }
}
