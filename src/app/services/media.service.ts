import { Injectable, Pipe, PipeTransform } from '@angular/core';
import Fuse from 'fuse.js';

export interface Media {
  name: string;
  author: string;
  album?: string;
  keywords: string[];
  type: 'music' | 'anime' | 'lightnovel';
  file?: string;
  cover?: string;
  year?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  musicList: Media[] = [
    {
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
      name: '失恋ソング沢山聴いて 泣いてばかりの私はもう。',
      author: 'りりあ。',
      album: '失恋ソング沢山聴いて 泣いてばかりの私はもう。',
      keywords: ['Riria.'],
      type: 'music',
      cover: './cover/cover_riria.jpg',
      file: './music/riria/summer-time-rendering/01.mp3',
      year: 2022
    }
  ]

  constructor() { }

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
