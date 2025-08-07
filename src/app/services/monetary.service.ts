import { Injectable, Pipe, PipeTransform } from '@angular/core';
import Fuse from 'fuse.js';

@Injectable({
  providedIn: 'root'
})
export class MonetaryService {
  globalPositions: Position[] = [
    {
      type: 'fund',
      name: '贝莱德美国灵活股票基金',
      location: 'ae',
      currency: 'USD',
      isin: 'LU0154236417',
      class: 'A2',
      percentage: '10.00%',
    },
    {
      type: 'fund',
      name: '贝莱德智慧数据环球股票高息基金',
      location: 'cn',
      currency: 'USD',
      isin: 'LU1116320737',
      class: 'A6',
      percentage: '10.00%',
    }
  ];
  constructor() {

  }

  search(fundsList: Position[], keyword: string) {
    return new Fuse(fundsList, {
      threshold: 0.5,
      keys: ['name', 'isin', 'location', 'currency', 'class']
    }).search(keyword).map(item => item.item);
  }
}

export interface Position {
  type: 'fund' | 'stock' | 'bill' | 'cash' | 'deposit',
  name: string;
  amount?: number;
  location: 'cn' | 'ae' | 'us' | 'hk' | 'pt' | 'jp';
  currency: 'USD' | 'EUR' | 'CNY' | 'JPY',
  isin?: string;
  class?: string;
  percentage?: string;
}

export function getExchange(fx: string) {
  switch (fx) {
    case 'USD': return 7.21;
    case 'EUR': return 8.22;
    case 'JPY': return 0.0478;
    default: return 1;
  }
}

@Pipe({
  name: 'groupByPositionType'
})
export class GroupByPositionType implements PipeTransform {
  transform(fundsList: Position[]) {
    const map = fundsList.reduce<Record<string, Position[]>>((acc, item) => {
      (acc[item.type!] ||= []).push(item);
      return acc;
    }, {});

    // 把 { album: Media[] } 转成 [{ album, items }]
    return Object.entries(map).map(([type, items]) => ({ type, items }));
  }
}