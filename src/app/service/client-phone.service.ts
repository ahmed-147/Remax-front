import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClientPhone} from './../model/interface/iclient-phone';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientPhoneService {
  hosttURL = environment.apiUrl
  port = environment.port
  
  constructor(private http: HttpClient) { }
  
  getAllClientPhones(): Observable<IClientPhone[]> {
    return this.http.get<IClientPhone[]>(`${this.hosttURL}:${this.port}/client/getclientphones/`);
  }
  getAllClientPhonesById(id): Observable<IClientPhone>{

    return this.http.get<IClientPhone>(`${this.hosttURL}:${this.port}/client/clientphones/${id}/`);

  }
  getAllClientPhonesByClientId(id): Observable<IClientPhone[]>{
    
    return this.http.get<IClientPhone[]>(`${this.hosttURL}:${this.port}/client/clientphonesbyid/${id}/`);

  }
  getPhoneById(phoneId): Observable<IClientPhone>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.get<IClientPhone>(`${this.hosttURL}:${this.port}/client/clientphonebyId/${phoneId}/` , httpOptions)
  }
  addClientPhone(pst: IClientPhone): Observable<IClientPhone> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClientPhone>(`${this.hosttURL}:${this.port}/client/postclientphones/`, pst, httpOptions)
  }
  updateClientPhone(id, pst: IClientPhone): Observable<IClientPhone> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
   //     ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IClientPhone>(`${this.hosttURL}:${this.port}/client/clientphones/${id}/`, pst, httpOptions)
  }
  deleteClientPhoneById(id): Observable<IClientPhone>{
 
    return this.http.delete<IClientPhone>(`${this.hosttURL}:${this.port}/client/clientphones/${id}/`,);

  }

  checkClientExist(phone) : Observable <any>{
    return this.http.get<IClientPhone[]>(`${this.hosttURL}:${this.port}/client/cilentfromPhone/${phone}/`);
  }
}
