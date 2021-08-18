import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder} from './../model/interface/iorder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  hosttURL = environment.apiUrl
  port = environment.port
  constructor(private http: HttpClient) { }
  getAllOrders(): Observable<IOrder[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrder[]>(`${this.hosttURL}:${this.port}/order/getorders/`, httpOptions);
  }
  getAllOrdersById(id): Observable<IOrder>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrder>(`${this.hosttURL}:${this.port}/order/orders/${id}/`, httpOptions);

  }
  //To get All Order By Client ID
  getAllOrdersByClientId(id): Observable<IOrder[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrder[]>(`${this.hosttURL}:${this.port}/order/getordersbyclientid/${id}/`, httpOptions);

  }
  addOrder(pst: IOrder): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IOrder>(`${this.hosttURL}:${this.port}/order/postorders/`, pst, httpOptions)
  }
  updateOrder(id, pst: IOrder): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IOrder>(`${this.hosttURL}:${this.port}/order/orders/${id}/`, pst, httpOptions)
  }
  deleteOrderById(id): Observable<IOrder>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<IOrder>(`${this.hosttURL}:${this.port}/order/orders/${id}/`, httpOptions);

  }
}
