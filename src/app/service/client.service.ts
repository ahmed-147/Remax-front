import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient} from './../model/interface/iclient';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  hosttURL = environment.apiUrl
  port = environment.port

  constructor(private http: HttpClient) { }
  getAllClients(): Observable<IClient[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IClient[]>(`${this.hosttURL}:${this.port}/client/getclients/`, httpOptions);
  }
  getAllClientsById(id): Observable<IClient>{
    return this.http.get<IClient>(`${this.hosttURL}:${this.port}/client/clients/${id}/`);
  }
  addClient(pst: IClient): Observable<IClient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClient>(`${this.hosttURL}:${this.port}/client/postclients/`, pst, httpOptions)
  }
  updateClient(id, pst: IClient): Observable<IClient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
    //    ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IClient>(`${this.hosttURL}:${this.port}/client/clients/${id}/`, pst, httpOptions)
  }
  deleteClientById(id): Observable<IClient>{
        return this.http.delete<IClient>(`${this.hosttURL}:${this.port}/client/clients/${id}/`);

  }
  sendClientKey(email): Observable<IClient>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    
    return this.http.post<IClient>(`${this.hosttURL}:${this.port}/client/postclientkey/`,{email:email}, httpOptions);

  }
  activeClientKey(email, key): Observable<IClient>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    
    return this.http.post<IClient>(`${this.hosttURL}:${this.port}/client/clientactivekey/`,{email:email, key:key}, httpOptions);

  }

  getClientsByEmail(email): Observable<IClient>{
    return this.http.get<IClient>(`${this.hosttURL}:${this.port}/client/cilentByEmail/${email}/`);
  }
}
