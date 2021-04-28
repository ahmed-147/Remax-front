import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem} from './../model/interface/iitem';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }
  getAllItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>('http://localhost:8000/item/getitems/');
  }
  getAllItemsById(id): Observable<IItem>{
    
    return this.http.get<IItem>(`http://localhost:8000/item/getitembyid/${id}/`);

  }
  addItem(pst: IItem): Observable<IItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<IItem>('http://localhost:8000/item/postitems/', pst, httpOptions)
  }
  updateItem(id, pst: IItem): Observable<IItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IItem>(`http://localhost:8000/item/updateordeleteitembyid/${id}/`, pst, httpOptions)
  }
  deleteItemById(id): Observable<IItem>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<IItem>(`http://localhost:8000/item/updateordeleteitembyid/${id}/`, httpOptions);

  }
}
