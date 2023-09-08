import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
   
  //user will not edit delete or add into the server but all api end points called successfully with staus code 200k
  //due to Dummy Api
  private apiUrl = 'https://dummyjson.com/users';

  //displaty the results
  updatedData: any;
  addUserData: any;

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }

  updateUser(id: number, updatedData: any) {
    // user will not update it into the server due to dummy api 
    // it return Status Code:200k
    const url = `${this.apiUrl}/${id}`; 
    this.updatedData = updatedData //for update data without api
    return this.http.put(url, updatedData);
  }
deleteUser(id: number): Observable<any> {
    // user will not deleted into the server due to dummy api 
    // it return Status Code:200k
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete(url);
}

addUser(user: any): Observable<any> {

  // it will not add new user into the server due to dummy Api but 
  // It will simulate a POST request and return Status Code:200k

  const url = `${this.apiUrl}/add`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  this.addUserData = user // for add user without api
  return this.http.post(url, JSON.stringify(user), { headers });
}
  getPaginationData(skip: number, limit: number): Observable<any> {
   //for skip users records
    let params = new HttpParams();
    params = params.set('skip', skip.toString());
    params = params.set('limit', limit.toString());

    return this.http.get(this.apiUrl, { params });
  }
}
