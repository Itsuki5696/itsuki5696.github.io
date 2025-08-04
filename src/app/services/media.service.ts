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
  audioSrc$ = this.audioSrcSubject.asObservable();
  audioQueue: Queue<string>;

  setAudioSrc(src: string) {
    this.audioSrcSubject.next(src);
  }

  musicList: Media[] = [
    {
      id: 4,
      name: '騙されないからね。',
      author: 'りりあ。',
      album: '軌跡',
      keywords: ['Riria.'],
      type: 'music',
      cover: './cover/cover_riria_kiseki.jpg',
      file: './music/riria/kiseki/04.mp3',
      year: 2024
    },
    {
      name: '失恋ソング沢山聴いて　泣いてばかりの私はもう。',
      author: 'りりあ。',
      album: '失恋ソング沢山聴いて　泣いてばかりの私はもう。',
      keywords: ['Riria.'],
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