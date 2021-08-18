import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/model/interface/iitem';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchitemService {

  hosttURL = environment.apiUrl
  port = environment.port
  constructor(private http: HttpClient) { }

  getItemsBySearch(searchTerm : string ): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.hosttURL}:${this.port}/item/searchitem/?search=${searchTerm}`);
  }
 
  
}
