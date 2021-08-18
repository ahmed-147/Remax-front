import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem} from './../model/interface/iitem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  hosttURL = environment.apiUrl
  port = environment.port

  constructor(private http: HttpClient) { }
  getAllItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.hosttURL}:${this.port}/item/getitems/`);
  }
  getAllItemsById(id): Observable<IItem>{
    
    return this.http.get<IItem>(`${this.hosttURL}:${this.port}/item/getitembyid/${id}/`);

  }
  addItem(pst: IItem): Observable<IItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<IItem>(`${this.hosttURL}:${this.port}/item/postitems/`, pst, httpOptions)
  }
  updateItem(id, pst: IItem): Observable<IItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IItem>(`${this.hosttURL}:${this.port}/item/updateordeleteitembyid/${id}/`, pst, httpOptions)
  }
  deleteItemById(id): Observable<IItem>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<IItem>(`${this.hosttURL}:${this.port}/item/updateordeleteitembyid/${id}/`, httpOptions);

  }

  getItemsByCategortyId(id): Observable<IItem[]>{
    
    return this.http.get<IItem[]>(`${this.hosttURL}:${this.port}/item/getitembycategoryid/${id}/`);
  }
  getItemsByBrandId(id): Observable<IItem[]>{
    
    return this.http.get<IItem[]>(`${this.hosttURL}:${this.port}/item/getitembybrandid/${id}/`);

  }
}
