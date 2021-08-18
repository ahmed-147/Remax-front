import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBrand} from './../model/interface/ibrand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {
  hosttURL = environment.apiUrl
  port = environment.port
  
  constructor(private http: HttpClient) { }
  getAllBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.hosttURL}:${this.port}/brand/getbrands/`);
  }
  getAllBrandsById(id): Observable<IBrand>{
    return this.http.get<IBrand>(`${this.hosttURL}:${this.port}/brand/brands/${id}/`)
  }
  addBrand(pst: any): Observable<IBrand> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<IBrand>(`${this.hosttURL}:${this.port}/brand/postbrands/`, pst, httpOptions)
  }
  updateBrand(id, pst: any): Observable<IBrand> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept': ' */*'
        //,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.patch<IBrand>(`${this.hosttURL}:${this.port}/brand/brands/${id}/`, pst, httpOptions)
  }
  deleteBrandById(id): Observable<IBrand>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': ' */*'
    //     ,'Authorization': 'jwt '+localStorage.getItem('token')
    //   })
    // };
    return this.http.delete<IBrand>(`${this.hosttURL}:${this.port}/brand/brands/${id}/`)

  }
  

}
