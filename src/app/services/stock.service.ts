import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Stock {
  id: string;
  name: string;
  category: number;
  quantity: string;
}

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private firestore: Firestore) {}

  getStocks(): Observable<Stock[]> {
    const stockRef = collection(this.firestore, 'stocks');
    return collectionData(stockRef, { idField: 'id' }) as Observable<Stock[]>;
  }

  addStock(stock: Stock): Promise<any> {
    const stockRef = collection(this.firestore, 'stocks');
    return addDoc(stockRef, stock);
  }
}
