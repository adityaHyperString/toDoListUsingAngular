import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoListComponent } from "./add-todo-list/add-todo-list.component";
import { ShowTodoListComponent } from "./show-todo-list/show-todo-list.component";

const routes: Routes = [
  {
    path:'add-ToDoList',
    component: AddTodoListComponent,
  },
  {
    path:'show-ToDoList',
    component: ShowTodoListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
