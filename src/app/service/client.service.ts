import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient} from './../model/interface/iclient';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  getAllClients(): Observable<IClient[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IClient[]>('http://localhost:8000/client/getclients/', httpOptions);
  }
  getAllClientsById(id): Observable<IClient>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<IClient>(`http://localhost:8000/client/clients/${id}/`, httpOptions);

  }
  addClient(pst: IClient): Observable<IClient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClient>('http://localhost:8000/client/postclients/', pst, httpOptions)
  }
  updateClient(id, pst: IClient): Observable<IClient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IClient>(`http://localhost:8000/client/clients/${id}/`, pst, httpOptions)
  }
  deleteClientById(id): Observable<IClient>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    
    return this.http.delete<IClient>(`http://localhost:8000/client/clients/${id}/`, httpOptions);

  }
}
