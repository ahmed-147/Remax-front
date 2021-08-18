import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './../model/interface/icategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  hosttURL = environment.apiUrl
  port = environment.port

  constructor(private http: HttpClient) { }
  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.hosttURL}:${this.port}/category/getcategories/`);
  }
  getAllCategoriesById(id): Observable<ICategory>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': ' */*'
    //     ,'Authorization': 'jwt '+localStorage.getItem('token')
    //   })
    // };
    return this.http.get<ICategory>(`${this.hosttURL}:${this.port}/category/categories/${id}/`);

  }
  addCategory(pst: ICategory): Observable<ICategory> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<ICategory>(`${this.hosttURL}:${this.port}/category/postcategories/`, pst, httpOptions)
  }
  updateCategory(id, pst: ICategory): Observable<ICategory> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
      //  ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<ICategory>(`${this.hosttURL}:${this.port}/category/categories/${id}/`, pst, httpOptions)
  }
  deleteCategoryById(id): Observable<ICategory>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': ' */*'
    //     //,'Authorization': 'jwt '+localStorage.getItem('token')
    //   })
    // };
    return this.http.delete<ICategory>(`${this.hosttURL}:${this.port}/category/categories/${id}/`);

  }
  

}

