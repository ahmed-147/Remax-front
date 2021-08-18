import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemImgs } from './../model/interface/item-imgs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ItemImgsService {

  hosttURL = environment.apiUrl
  port = environment.port

  constructor(private http: HttpClient) { }
  getAllItemImgs(): Observable<ItemImgs[]> {
    return this.http.get<ItemImgs[]>(`${this.hosttURL}:${this.port}/item/getitemsimgs/`);
  }
  getAllItemImgsByItemId(id): Observable<ItemImgs[]>{
    return this.http.get<ItemImgs[]>(`${this.hosttURL}:${this.port}/item/itemimgs/${id}/`);
  }
  addItemImgs(pst: any): Observable<ItemImgs> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<ItemImgs>(`${this.hosttURL}:${this.port}/item/postitemsimgs/`, pst, httpOptions)
  }
  
  deleteItemImgById(id): Observable<ItemImgs>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<ItemImgs>(`${this.hosttURL}:${this.port}/item/itemimgsdelete/${id}/`, httpOptions);

  }
}
