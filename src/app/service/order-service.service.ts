import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder} from './../model/interface/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }
  getAllOrders(): Observable<IOrder[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrder[]>('http://localhost:8000/order/getorders/', httpOptions);
  }
  getAllOrdersById(id): Observable<IOrder>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IOrder>(`http://localhost:8000/order/orders/${id}/`, httpOptions);

  }
  addOrder(pst: IOrder): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IOrder>('http://localhost:8000/order/postorders/', pst, httpOptions)
  }
  updateOrder(id, pst: IOrder): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IOrder>(`http://localhost:8000/order/orders/${id}/`, pst, httpOptions)
  }
  deleteOrderById(id): Observable<IOrder>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<IOrder>(`http://localhost:8000/order/orders/${id}/`, httpOptions);

  }
}
