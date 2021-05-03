import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/model/interface/iitem';


@Injectable({
  providedIn: 'root'
})
export class SearchitemService {
  
  constructor(private http: HttpClient) { }

  getItemsBySearch(searchTerm : string ): Observable<IItem[]> {
    return this.http.get<IItem[]>(`http://localhost:8000/item/searchitem/?search=${searchTerm}`);
  }
 
  
}
