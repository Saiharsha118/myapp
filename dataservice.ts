import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Entry {
  MarketScope: string;
  MarketName: string;
  BCenter: string;
  State: string;
  DMA: string;
  Focus: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: Entry[] = [];
  private dataSubject = new BehaviorSubject<Entry[]>([]);
  private selectedEntrySource = new BehaviorSubject<Entry | null>(null);

  selectedEntry$ = this.selectedEntrySource.asObservable();

  constructor() {
    const saved = localStorage.getItem('entries');
    if (saved) {
      this.data = JSON.parse(saved);
      this.dataSubject.next(this.data);
    }
  }

  getDataObservable(): Observable<Entry[]> {
    return this.dataSubject.asObservable();
  }

  create(entry: Entry) {
    this.data.unshift({ ...entry });
    this.saveData();
  }

  delete(entry: Entry) {
    const index = this.data.indexOf(entry);
    if (index > -1) {
      this.data.splice(index, 1);
      this.saveData();
    }
  }

  update(entry: Entry, index: number | undefined) {
    if (index !== undefined && index > -1) {
      this.data[index] = entry;
      this.saveData();
    }
  }

  setSelectedEntry(entry: Entry) {
    this.selectedEntrySource.next(entry);
  }

  private saveData() {
    localStorage.setItem('entries', JSON.stringify(this.data));
    this.dataSubject.next(this.data); // 🔄 notify table updates
  }
}
