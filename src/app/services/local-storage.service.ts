import { Injectable } from '@angular/core';
import { Autocomplete } from '../models/autocomplete.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  indexedDB: IDBFactory;
  window: any = window;
  citiesDatabaseIndex = "CitiesDatabase";

  constructor() {
    this.indexedDB = this.window.indexedDB || this.window.mozIndexedDB ||
      this.window.webkitIndexedDB || this.window.msIndexedDB;
      this.setCitiesDatabase()
  }

  // setCities(searchedQuery: string, cities: Autocomplete[]) {
  //   window.localStorage.setItem(searchedQuery, JSON.stringify(cities));
  // }

  // getCities(searchedQuery: string): Autocomplete[] | undefined {
  //   const citiesJsonStr = window.localStorage.getItem(searchedQuery);
  //   return citiesJsonStr ? JSON.parse(citiesJsonStr) : undefined;
  // }

  // isKeyExist(key: string) {
  //   return localStorage.getItem(key)
  // }


  async setCities(searchedQuery: string, cities: Autocomplete[]): Promise<boolean> {
    return await this.getTransactionCitiesDatabase<boolean>((store, res, rej) => {
      store.put(cities, searchedQuery);
      res(true);
    });
  }

  async getCities(searchedQuery: string | null): Promise<Autocomplete[] | null> {
    if (searchedQuery) {
      return await this.getTransactionCitiesDatabase((store, res, rej) => {
        let q1: IDBRequest<Autocomplete[]> = store.get(searchedQuery);
        q1.onsuccess = function () {
          res(q1.result);
        };
        q1.onerror = function (e) {
          rej(e.target);
        };
      });
    }
    return Promise.resolve(null);
  }

  private setCitiesDatabase() {
    let request = this.indexedDB.open(this.citiesDatabaseIndex, 1);

    request.onupgradeneeded = function (e) {
      let db = request.result;
      db.createObjectStore("CitiesStore");
    };
  }

  private getTransactionCitiesDatabase<T>(callback: (store: IDBObjectStore, res: (value: T | PromiseLike<T>) => void, rej: (reason?: any) => void) => void): Promise<T> {
    return new Promise((res, rej) => {
      let request = this.indexedDB.open(this.citiesDatabaseIndex, 1),
        db: IDBDatabase, tx, store;

      request.onsuccess = function () {
        db = request.result;
        tx = db.transaction("CitiesStore", "readwrite");
        store = tx.objectStore("CitiesStore");
        db.onerror = function (err) {
          rej();
        };
        //action
        callback(store, res, rej);
        // finally
        tx.oncomplete = function (e) {
          db.close();
        };
      };
    });
  }
}
