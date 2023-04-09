import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Task} from "../model/task"
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

   serviceUrl:string;

  constructor(private http:HttpClient) { 
    this.serviceUrl = "  http://localhost:3000/"
  }

  // this service is used to connect all api 
  addTask(task:Task) : Observable<Task>{
    console.log(task)
    return this.http.post<Task>(this.serviceUrl+'task',task)
  }

  getAllTask() : Observable<Task[]>{
    return this.http.get<Task[]>(this.serviceUrl+'todo')
  }

  deleteTask(task:Task) : Observable<Task>{
    console.log(task)
    return this.http.delete<Task>(this.serviceUrl + 'todo/'+task._id)
  }


  editTask(task: Task): Observable<Task> {
    const url = `${this.serviceUrl}todo/${task._id}`;
    console.log(url)
    return this.http.put<Task>(url, task);
  }
}
