import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './../model/interface/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) { }
  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8000/category/getcategories/');
  }
  getAllCategoriesById(id): Observable<ICategory>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.get<ICategory>(`http://localhost:8000/category/categories/${id}/`, httpOptions);

  }
  addCategory(pst: ICategory): Observable<ICategory> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.post<ICategory>('http://localhost:8000/category/postcategories/', pst, httpOptions)
  }
  updateCategory(id, pst: ICategory): Observable<ICategory> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.put<ICategory>(`http://localhost:8000/category/categories/${id}/`, pst, httpOptions)
  }
  deleteCategoryById(id): Observable<ICategory>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        ,'Authorization': 'jwt '+localStorage.getItem('token')
      })
    };
    return this.http.delete<ICategory>(`http://localhost:8000/category/categories/${id}/`, httpOptions);

  }
  

}

