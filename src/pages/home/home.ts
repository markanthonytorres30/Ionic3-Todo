import { Component } from '@angular/core';
import { ToastController,NavController, AlertController,reorderArray } from 'ionic-angular';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';
import { TodoService } from '../../providers/todo-service/todo-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderisEnabled = false;
  public archiveTodosPage = ArchivedTodosPage;
 

  constructor(private toastController: ToastController,public navCtrl: NavController, private alertController: AlertController, private todoService: TodoService) {
   this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoService.archiveTodo(todoIndex);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder(){
    this.reorderisEnabled = !this.reorderisEnabled;
  }

 itemReordered($event){
  reorderArray(this.todos,$event);
 }

 openEditAlert(todoIndex){
   let todo = this.todoService.getTodo(todoIndex);
   let editTodoAlert = this.alertController.create({
     title: "Edit a Todo",
     message: "Edit your todo here.",
     inputs:[{
       type: "text",
       name: "editTodoInput",
       value: todo
     }],
     buttons:[{
       text: "Cancel"
     },
    {
      text:"Update",
      handler:(inputData)=>{
        let todoText;
        todoText = inputData.editTodoInput;
        this.todoService.editTodo(todoText,todoIndex);


        editTodoAlert.onDidDismiss(()=>{ 
          let editTodoToast = this.toastController.create({
            message: "Updated todo",
            duration: 2000
        });
          editTodoToast.present();
      });        
       

    }}],
   });
   editTodoAlert.present();
 }

  openTodoAlert(){

    let addTodoAlert = this.alertController.create({
      title: "Add a Todo",
      message: "Enter your todo here.",
      inputs:[
        {
          type: "text",
          name:"addTodoInput"
        }
      ],
      buttons:[
        {
          text:"Cancel"
        },
        {
          text:"Add Todo",
          handler: (inputData)=>{
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);

          addTodoAlert.onDidDismiss(()=>{
            let addTodoToast = this.toastController.create({
              message: "Added todo",
              duration: 2000
            });
              addTodoToast.present();
          });
          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
