import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { ToDoItems } from "../model/savetodo";
import { HttpHeaders } from "@angular/common/http";
import { User } from "../model/user";

@Injectable()
export class Service {
    
    constructor(private http: HttpClient) {
         headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}
    private apiUrl = 'http://localhost:8080/todos';
    saveToDo(save: ToDoItems): Observable<ToDoItems> {
        return this.http.post<ToDoItems>(this.apiUrl + "/save", save);
    }
    getToDo(): Observable<ToDoItems[]> {
        return this.http.get<ToDoItems[]>(this.apiUrl + "/get");
    }
    deleteToDo(id: string): Observable<void> {
        const body = { id: id };
        return this.http.post<void>(this.apiUrl + "/delete", body, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
    checkUser(login:User): Observable<User[]>{
        return this.http.post<User[]>(this.apiUrl + "/login",login);
      }
}