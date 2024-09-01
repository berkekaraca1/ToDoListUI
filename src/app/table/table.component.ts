import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Service } from 'src/app/service/service';
import { ToDoItems } from '../model/savetodo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [DatePipe]
})
export class TableComponent implements OnInit {

  id: string = '';
  task: string = '';
  priority: string = '';
  createdAt: string = '';
  status: string = "Not completed.";
  toDoItems: ToDoItems[] = [];
  isSavePopupVisible = false;

  constructor(private service: Service, private dataPipe: DatePipe) { }

  ngOnInit(): void {
    this.getTasks();
  }

  saveToDo(): void {
    this.submitTask();
  }

  deleteToDo(): void {
    this.deleteTask(this.id);
  }

  getTasks(): void {
    this.service.getToDo().subscribe((toDoItems: ToDoItems[]) => {
      const storedItems = this.loadStatusFromLocalStorage();
      this.toDoItems = toDoItems.map(item => {
        const storedItem = storedItems.find(stored => stored.id === item.id);
        return storedItem ? { ...item, checkboxStatus: storedItem.checkboxStatus, status: storedItem.status } : item;
      });
    });
  }

  submitTask(): void {
    const currentDate = new Date(Date.now());
    const createdAt = this.dataPipe.transform(currentDate, "dd/MM/yyyy HH:mm");
    this.createdAt = createdAt || '';
    const requestData: ToDoItems = {
      id: this.id,
      task: this.task,
      priority: this.priority,
      createdAt: this.createdAt,
      status: this.status,
    };
    this.service.saveToDo(requestData).subscribe(() => {
      this.toDoItems.push(requestData);
      this.saveStatusToLocalStorage();
    });
    window.location.reload()
  }

  showSavePopup(): void {
    this.isSavePopupVisible = true;
    setTimeout(() => {
      this.isSavePopupVisible = false;
    }, 1000);
  }

  deleteTask(id: string): void {
    this.service.deleteToDo(id).subscribe(() => {
      this.toDoItems = this.toDoItems.filter(toDoItem => toDoItem.id !== id);
      this.saveStatusToLocalStorage();
    });
  }

  checkStatus(toDoItem: ToDoItems): void {
    toDoItem.status = toDoItem.checkboxStatus ? "Completed." : "Not completed.";
    this.saveStatusToLocalStorage();
  }

  saveStatusToLocalStorage(): void {
    localStorage.setItem('toDoItems', JSON.stringify(this.toDoItems));
  }

  loadStatusFromLocalStorage(): ToDoItems[] {
    const storedItems = localStorage.getItem('toDoItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
}
