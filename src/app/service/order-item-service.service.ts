import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderItem} from './../model/interface/iorder-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemServiceService {
  hosttURL = environment.apiUrl
  port = environment.port

  constructor(private http: HttpClient) { }
  getAllOrderItems(): Observable<IOrderItem[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrderItem[]>(`${this.hosttURL}:${this.port}/order/getorderitems/`, httpOptions);
  }
  getAllOrderItemById(id): Observable<IOrderItem>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrderItem>(`${this.hosttURL}:${this.port}/order/orderitems/${id}/`, httpOptions);

  }
  getAllOrderItemsByOrderId(id): Observable<IOrderItem[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrderItem[]>(`${this.hosttURL}:${this.port}/order/orderitemsbyid/${id}/`, httpOptions);

  }
  addOrderItem(pst: IOrderItem): Observable<IOrderItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IOrderItem>(`${this.hosttURL}:${this.port}/order/postorderitems/`, pst, httpOptions)
  }
  updateOrderItem(id, pst: IOrderItem): Observable<IOrderItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IOrderItem>(`${this.hosttURL}:${this.port}/order/orderitems/${id}/`, pst, httpOptions)
  }
  deleteOrderItemById(id): Observable<IOrderItem>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<IOrderItem>(`${this.hosttURL}:${this.port}/order/orderitems/${id}/`, httpOptions);

  }
}
