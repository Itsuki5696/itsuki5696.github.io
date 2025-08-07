import { Injectable, Pipe, PipeTransform } from '@angular/core';
import Fuse from 'fuse.js';
import { BehaviorSubject } from 'rxjs';

export interface Media {
  id?: number;
  name: string;
  author: string;
  album?: string;
  keywords: string[];
  type: 'music' | 'anime' | 'lightnovel';
  file?: string;
  cover?: string;
  year?: number;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private audioSrcSubject = new BehaviorSubject<string>('');
  audioSrc = "";
  audioSrc$ = this.audioSrcSubject.asObservable();
  audioQueue: Queue<string>;

  setAudioSrc(src: string) {
    this.audioSrc = src;
    this.audioSrcSubject.next(src);
  }

  musicList: Media[] = [
    {
      id: 4,
      name: '騙されないからね。',
      author: 'りりあ。',
      album: '軌跡',
      keywords: ['Riria.', 'kiseki', 'urusaikarane.'],
      type: 'music',
      cover: './cover/cover_riria_kiseki.jpg',
      file: './music/riria/kiseki/04.mp3',
      year: 2024
    },
    {
      name: '失恋ソング沢山聴いて　泣いてばかりの私はもう。',
      author: 'りりあ。',
      album: '失恋ソング沢山聴いて　泣いてばかりの私はもう。',
      keywords: ['Riria.', 'shitsurensongutakusankiite naitebakarinowatashiwamou.'],
      type: 'music',
      cover: './cover/cover_riria.jpg',
      file: './music/riria/summer-time-rendering/01.mp3',
      year: 2022,
      description: 'TVアニメ「サマータイムレンダ」エンディングテーマ'
    },
    {
      name: 'Motasoa',
      author: 'Eida Al-Menhali',
      album: 'Motasoa',
      keywords: ['Motasoa', 'Eldha Al-Menhali'],
      type: 'music',
      year: 2017
    },

    { id: 2, name: '今夜2人だけのダンスを', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/02.今夜2人だけのダンスを.mp3', year: 2023, description: '' }, { id: 10, name: '届く、未来へ', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/10.届く、未来へ.mp3', year: 2023, description: '' }, { id: 7, name: 'アカネチル', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/07.アカネチル.mp3', year: 2023, description: '' }, { id: 14, name: '13月', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/14.13月.mp3', year: 2023, description: '' }, { id: 6, name: '憂い桜', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/06.憂い桜.mp3', year: 2023, description: '' }, { id: 5, name: 'また夏を追う', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/05.また夏を追う.mp3', year: 2023, description: '' }, { id: 13, name: '空蒼いまま', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/13.空蒼いまま.mp3', year: 2023, description: '' }, { id: 1, name: 'ただ好きと言えたら', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/01.ただ好きと言えたら.mp3', year: 2023, description: '' }, { id: 12, name: '雪冴ゆる', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/12.雪冴ゆる.mp3', year: 2023, description: '' }, { id: 11, name: '眠れない夜を君に', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/11.眠れない夜を君に.mp3', year: 2023, description: '' }, { id: 4, name: '僕らはそれを愛と呼んだ', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/04.僕らはそれを愛と呼んだ.mp3', year: 2023, description: '' }, { id: 3, name: '夏が来るたび', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/03.夏が来るたび.mp3', year: 2023, description: '' }, { id: 8, name: 'クリスマスのよる', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/08.クリスマスのよる.mp3', year: 2023, description: '' }, { id: 9, name: '青を掬う', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/09.青を掬う.mp3', year: 2023, description: '' },

    {
      id: 8,
      name: 'outcry',
      author: 'あたらよ',
      album: '極夜において月は語らず',
      keywords: ['atarayo', '可惜夜'],
      type: 'music',
      cover: './music/atarayo/COVER.jpg',
      file: './music/atarayo/2022/08.mp3',
      year: 2022,
      description: ''
    }
  ]

  constructor() {
    this.audioQueue = new Queue<string>;
  }

  groupMediaByAlbum(mediaList: Media[], album: string): Media[] {
    return mediaList.filter(item => item.album === album);
  }

  groupMediaByAuthor(mediaList: Media[], author: string): Media[] {
    return mediaList.filter(item => item.author === author);
  }

  search(mediaList: Media[], keyword: string) {
    return new Fuse(mediaList, {
      threshold: 0.5,
      keys: ['name', 'author', 'album', 'keywords']
    }).search(keyword).map(item => item.item);
  }
}

@Pipe({
  name: 'groupByAlbum'
})
export class GroupByAlbum implements PipeTransform {
  transform(mediaList: Media[]) {
    const map = mediaList.reduce<Record<string, Media[]>>((acc, item) => {
      (acc[item.album!] ||= []).push(item);
      return acc;
    }, {});

    // 把 { album: Media[] } 转成 [{ album, items }]
    return Object.entries(map).map(([album, items]) => ({ album, author: items[0].author, cover: items[0].cover, items }));
  }
}

@Pipe({
  name: 'groupByArtist'
})
export class GroupByArtist implements PipeTransform {
  transform(mediaList: Media[]) {
    const map = mediaList.reduce<Record<string, Media[]>>((acc, item) => {
      (acc[item.author!] ||= []).push(item);
      return acc;
    }, {});

    // 把 { album: Media[] } 转成 [{ album, items }]
    return Object.entries(map).map(([author, items]) => ({ author, cover: items[0].cover, items }));
  }
}

export class Queue<T> {
  private items: T[];
  constructor() {
    this.items = [];
  }
  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length == 0;
  }
}