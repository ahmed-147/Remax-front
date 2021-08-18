import { IClientLocation } from './../model/interface/iclient-location';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {
  hosttURL = environment.apiUrl
  port = environment.port
  
  constructor(private http: HttpClient) { }
  getAllClientLocations(): Observable<IClientLocation[]> {
   
    return this.http.get<IClientLocation[]>(`${this.hosttURL}:${this.port}/client/getclientlocations/`);
  }
  getAllClientLocationsById(id): Observable<IClientLocation>{
    return this.http.get<IClientLocation>(`${this.hosttURL}:${this.port}/client/clientlocations/${id}/`);

  }
  getAllClientLocationsByClientId(id): Observable<IClientLocation[]>{

    return this.http.get<IClientLocation[]>(`${this.hosttURL}:${this.port}/client/clientlocationsbyid/${id}/`);

  }
  addClientLocation(pst: IClientLocation): Observable<IClientLocation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClientLocation>(`${this.hosttURL}:${this.port}/client/postclientlocations/`, pst, httpOptions)
  }
  updateClientLocation(id, pst: IClientLocation): Observable<IClientLocation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
   //     ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IClientLocation>(`${this.hosttURL}:${this.port}/client/clientlocations/${id}/`, pst, httpOptions)
  }
  deleteClientLocationById(id): Observable<IClientLocation>{
    
    return this.http.delete<IClientLocation>(`${this.hosttURL}:${this.port}/client/clientlocations/${id}/`);

  }
}
