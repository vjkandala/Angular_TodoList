import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        alert(x);
        x['$key'] = element.key;
        alert(x['$key']);
        this.toDoListArray.push(x);
        alert(x);
      });

      // sort
      // this.toDoListArray.sort((a, b) => {
      // });


    });
  }

  onAdd(title) {
    this.todoService.addTitle(title.value);
    title.value = null;
  }

  alterCheck($key: string, isChecked) {
      this.todoService.checkOrUncheckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.todoService.removeTitle($key);
  }

}
