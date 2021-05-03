import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClientPhone} from './../model/interface/iclient-phone';

@Injectable({
  providedIn: 'root'
})
export class ClientPhoneService {

  constructor(private http: HttpClient) { }
  getAllClientPhones(): Observable<IClientPhone[]> {
    return this.http.get<IClientPhone[]>('http://localhost:8000/client/getclientphones/');
  }
  getAllClientPhonesById(id): Observable<IClientPhone>{

    return this.http.get<IClientPhone>(`http://localhost:8000/client/clientphones/${id}/`);

  }
  getAllClientPhonesByClientId(id): Observable<IClientPhone[]>{
    
    return this.http.get<IClientPhone[]>(`http://localhost:8000/client/clientphonesbyid/${id}/`);

  }
  addClientPhone(pst: IClientPhone): Observable<IClientPhone> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClientPhone>('http://localhost:8000/client/postclientphones/', pst, httpOptions)
  }
  updateClientPhone(id, pst: IClientPhone): Observable<IClientPhone> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
   //     ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IClientPhone>(`http://localhost:8000/client/clientphones/${id}/`, pst, httpOptions)
  }
  deleteClientPhoneById(id): Observable<IClientPhone>{
 
    return this.http.delete<IClientPhone>(`http://localhost:8000/client/clientphones/${id}/`,);

  }
}
