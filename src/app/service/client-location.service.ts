import { IClientLocation } from './../model/interface/iclient-location';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {

  constructor(private http: HttpClient) { }
  getAllClientLocations(): Observable<IClientLocation[]> {
    return this.http.get<IClientLocation[]>('http://localhost:8000/client/client-location/');
  }
  getAllClientLocationsById(id): Observable<IClientLocation>{
    
    return this.http.get<IClientLocation>(`http://localhost:8000/client/client-location/${id}/`);

  }
  addClientLocation(pst: IClientLocation): Observable<IClientLocation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClientLocation>('http://localhost:8000/client/client-location/', pst, httpOptions)
  }
  updateClientLocation(id, pst: IClientLocation): Observable<IClientLocation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.put<IClientLocation>(`http://localhost:8000/client/client-location/${id}/`, pst, httpOptions)
  }
  deleteClientLocationById(id): Observable<IClientLocation>{
    
    return this.http.delete<IClientLocation>(`http://localhost:8000/client/client-location/${id}/`);

  }
}
