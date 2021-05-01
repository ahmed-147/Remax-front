import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemImgs } from './../model/interface/item-imgs';
@Injectable({
  providedIn: 'root'
})
export class ItemImgsService {

  constructor(private http: HttpClient) { }
  getAllItemImgs(): Observable<ItemImgs[]> {
    return this.http.get<ItemImgs[]>('http://localhost:8000/item/getitemsimgs/');
  }
  getAllItemImgsByItemId(id): Observable<ItemImgs[]>{
    return this.http.get<ItemImgs[]>(`http://localhost:8000/item/itemimgs/${id}/`);
  }
  addItemImgs(pst: any): Observable<ItemImgs> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<ItemImgs>('http://localhost:8000/item/postitemsimgs/', pst, httpOptions)
  }
  
  deleteItemImgById(id): Observable<ItemImgs>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<ItemImgs>(`http://localhost:8000/item/itemimgsdelete/${id}/`, httpOptions);

  }
}
