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
   
    return this.http.get<IClientLocation[]>('http://localhost:8000/client/getclientlocations/');
  }
  getAllClientLocationsById(id): Observable<IClientLocation>{
    return this.http.get<IClientLocation>(`http://localhost:8000/client/clientlocations/${id}/`);

  }
  getAllClientLocationsByClientId(id): Observable<IClientLocation[]>{

    return this.http.get<IClientLocation[]>(`http://localhost:8000/client/clientlocationsbyid/${id}/`);

  }
  addClientLocation(pst: IClientLocation): Observable<IClientLocation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<IClientLocation>('http://localhost:8000/client/postclientlocations/', pst, httpOptions)
  }
  updateClientLocation(id, pst: IClientLocation): Observable<IClientLocation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
   //     ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<IClientLocation>(`http://localhost:8000/client/clientlocations/${id}/`, pst, httpOptions)
  }
  deleteClientLocationById(id): Observable<IClientLocation>{
    
    return this.http.delete<IClientLocation>(`http://localhost:8000/client/clientlocations/${id}/`);

  }
}
