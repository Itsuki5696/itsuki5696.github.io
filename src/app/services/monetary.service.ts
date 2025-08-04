import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonetaryService {
  globalPositions: Position[] = [
    {
      type: 'fund',
      name: '贝莱德美国灵活股票基金',
      amount: 300000,
      location: 'UAE',
      currency: 'USD',
      isin: 'LU0154236417',
      class: 'A2'
    }
  ];
  globalPositionsPercentage: String[] = [];
  constructor() {
    const total = this.globalPositions.reduce((acc, item) => acc + item.amount * getExchange(item.currency), 0)
    this.globalPositions.map((item, i) => {
      this.globalPositionsPercentage.push((item.amount * getExchange(item.currency) / total * 100).toFixed(2) + '%');
    })
  }
}

export interface Position {
  type: 'fund' | 'stock' | 'bill' | 'cash' | 'deposit',
  name: string;
  amount: number;
  location: 'CHN' | 'UAE' | 'USA' | 'HKG' | 'PRT',
  currency: 'USD' | 'EUR' | 'CNY' | 'JPY',
  isin?: string;
  class?: string;
}

export function getExchange(fx: string) {
  switch (fx) {
    case 'USD': return 7.21;
    case 'EUR': return 8.22;
    case 'JPY': return 0.0478;
    default: return 1;
  }
}