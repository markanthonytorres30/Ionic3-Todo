import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoService {

  public todos = [];
  public archivedTodos =[];

  constructor(public http: HttpClient) {
    console.log('Hello TodoServiceProvider Provider');
  }

  getTodo(todoIndex){
    return this.todos[todoIndex];
  }

  editTodo(todoText,todoIndex){
    this.todos[todoIndex] = todoText;
  }

  archiveTodo(todoIndex){
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex,1);
    this.archivedTodos.push(todoToBeArchived);
  }

  addTodo(todoText){
    this.todos.push(todoText);
  }

  getTodos(){
    return this.todos;
  }

  getArchivedTodos(){
    return this.archivedTodos;
  }
}
