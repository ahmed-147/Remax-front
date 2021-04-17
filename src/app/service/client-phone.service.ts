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
    return this.http.get<IClientPhone[]>('http://localhost:8000/client/client-phone/');
  }
  getAllClientPhonesById(id): Observable<IClientPhone>{
    
    return this.http.get<IClientPhone>(`http://localhost:8000/client/client-phone/${id}/`);

  }
  addClientPhone(pst: IClientPhone): Observable<IClientPhone> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClientPhone>('http://localhost:8000/client/client-phone/', pst, httpOptions)
  }
  updateClientPhone(id, pst: IClientPhone): Observable<IClientPhone> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.put<IClientPhone>(`http://localhost:8000/client/client-phone/${id}/`, pst, httpOptions)
  }
  deleteClientPhoneById(id): Observable<IClientPhone>{
    
    return this.http.delete<IClientPhone>(`http://localhost:8000/client/client-phone/${id}/`);

  }
}
