import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBrand} from './../model/interface/ibrand';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  constructor(private http: HttpClient) { }
  getAllBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>('http://localhost:8000/brand/getbrands/');
  }
  getAllBrandsById(id): Observable<IBrand>{
    
    return this.http.get<IBrand>(`http://localhost:8000/brand/brands/${id}/`);

  }
  addBrand(pst: IBrand): Observable<IBrand> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': Bearer'my-auth-token'
      })
    };
    return this.http.post<IBrand>('http://localhost:8000/brand/postbrands/', pst, httpOptions)
  }
  updateBrand(id, pst: IBrand): Observable<IBrand> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.put<IBrand>(`http://localhost:8000/brand/brands/${id}/`, pst, httpOptions)
  }
  deleteBrandById(id): Observable<IBrand>{
    
    return this.http.delete<IBrand>(`http://localhost:8000/brand/brands/${id}/`);

  }
  

}
