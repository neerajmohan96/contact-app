import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  getUsers(page){
    return this.http.get("https://reqres.in/api/users?page="+page);
  }

  getUser(id){
    return this.http.get("https://reqres.in/api/users/"+id);
  }
}
