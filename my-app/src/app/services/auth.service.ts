import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";
import {Author} from "../models/author";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = "http://localhost:3000/authors";
  constructor(private http: HttpClient) { }

  getAll(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.API_URL}`);
  }

  findById(id: any): Observable<Author>{
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.get<Author>(requestUrl);
  }

  remove(id: any): Observable<any>{
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  store(object: Author): Observable<Author>{
    return this.http.post<Author>(this.API_URL, object);
  }

  update(object: Category): Observable<any>{
    let requestUrl = `${this.API_URL}/${object.id}`;
    return this.http.put<any>(requestUrl, object);
  }

  uploadImage(fd){
    let requestUrl = "http://localhost:8000/upload-img";
    return this.http.post<any>(requestUrl, fd);
  }
}