import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MusicComponent } from './components/music/music.component';
import { AnimeComponent } from './components/anime/anime.component';
import { MusicDetailComponent } from './components/music-detail/music-detail.component';
import { LightnovelComponent } from './components/lightnovel/lightnovel.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';
import { LightnovelDetailComponent } from './components/lightnovel-detail/lightnovel-detail.component';
import { MusicArtistComponent } from './components/music-artist/music-artist.component';

export const routes: Routes = [
    { path: 'music', component: MusicComponent },
    { path: 'music/album/:album', component: MusicDetailComponent },
    { path: 'music/artist/:artist', component: MusicArtistComponent },
    { path: 'anime', component: AnimeComponent },
    { path: 'anime/:name', component: AnimeDetailComponent },
    { path: 'lightnovel', component: LightnovelComponent },
    { path: 'lightnovel/:name', component: LightnovelDetailComponent },
    { path: 'settings', component: SettingsComponent },


    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent },
];