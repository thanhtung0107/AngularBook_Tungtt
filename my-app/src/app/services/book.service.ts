import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin  } from 'rxjs';
import {Category} from "../models/category";
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private bookApi: string = "http://localhost:3000/books";

  constructor(private http: HttpClient) { }
  
  getAll(filter: any = { keyword: ''}): Observable<any>{
    let requestUrl = this.bookApi + "?_expand=category&_expand=author";
    switch (filter.orderBy) {
      case "1":
        requestUrl += "&_sort=price&_order=asc";
        break;
      case "2":
        requestUrl += "&_sort=price&_order=desc";
        break;
      case "3":
        requestUrl += "&_sort=title&_order=asc";
        break;
      case "4":
        requestUrl += "&_sort=title&_order=desc";
        break;
      default:
        break;
    }
    if(filter.keyword.length > 0){
      requestUrl += `&title_like=${filter.keyword}`;
    }
    
    if (filter.categoryId) {
      requestUrl += `&categoryId=${filter.categoryId}`;
    }

    return this.http.get<any>(requestUrl);
  }

  findById(id: string): Observable<Book>{
    const requestUrl = `${this.bookApi}/${id}`;
    return this.http.get<any>(requestUrl);
  }

  removeMultiple(idList: any[]): Observable<any>{
    const requestUrls = idList.map(
      id => this.http.delete<any>(`${this.bookApi}/${id}`)
    );

    return forkJoin(requestUrls);
  }

  remove(id: any): Observable<any> {
    return this.http.delete<any>(`${this.bookApi}/${id}`);
  }

  store(object: Book): Observable<Book>{
    return this.http.post<Book>(this.bookApi, object);
  }

  update(object: Book): Observable<any>{
    const requestUrl = `${this.bookApi}/${object.id}`;
    return this.http.put<any>(requestUrl, object);
  }
}