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
    return this.http.get<IOrder[]>('http://localhost:8000/order/orders/');
  }
  getAllOrdersById(id): Observable<IOrder>{
    
    return this.http.get<IOrder>(`http://localhost:8000/order/orders/${id}/`);

  }
  addOrder(pst: IOrder): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IOrder>('http://localhost:8000/order/orders/', pst, httpOptions)
  }
  updateOrder(id, pst: IOrder): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.put<IOrder>(`http://localhost:8000/order/orders/${id}/`, pst, httpOptions)
  }
  deleteOrderById(id): Observable<IOrder>{
    
    return this.http.delete<IOrder>(`http://localhost:8000/order/orders/${id}/`);

  }
}
