import { Component ,OnInit} from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-todo-comp',
  templateUrl: './todo-comp.component.html',
  styleUrls: ['./todo-comp.component.css']
})

export class TodoCompComponent implements OnInit{

  taskObj : Task = new Task()

  taskArr : Task[] = [];

  addTaskValue : string = "";

  editTaskValue :string = "";

  constructor(private crudService:CrudService){
    console.log(this.taskArr)

  }
  ngOnInit(): void {
 
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
    this.editTaskValue = "";
    this.addTaskValue = "";
  }

//to get all the task from db using crudservice
  getAllTask(){
    this.crudService.getAllTask().subscribe(res =>{
      this.taskArr = res ;
      console.log(this.taskArr)
    },err => {
      console.log(err)
      alert("Unable To get The List ")
    })
  }
//to add  the task from db using crudservice
  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      console.log(res)
      this.ngOnInit();
      this.addTaskValue = "";
    },err => {
      alert(err)
    })
  }

//to edit the task from db using crudservice
  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert("Failed to update")
    })
  }

  

//to delete the task from db using crudservice
  deleteTask(etask : Task) {
    const confirmation =confirm('Do you want to proceed with the operation?');
    if (confirmation === true) {
      this.crudService.deleteTask(etask).subscribe(res => {
        console.log(res)
      },err => {
        alert("Failed to delete task")
      })
      this.getAllTask()
    } else {
      // do nothing
    }
  }

  
  call(etask:Task){
    this.taskObj = etask;
    this.editTaskValue = etask.text;
  }    
}
