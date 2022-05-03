import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddTodoListComponent } from './add-todo-list/add-todo-list.component';
import { ShowTodoListComponent } from './show-todo-list/show-todo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateTodoListComponent } from './update-todo-list/update-todo-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterPipe } from './appPipes/filter.pipe';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbWindowModule, NbTabsetModule, NbSidebarModule,NbIconModule,NbListModule,NbActionsModule,NbInputModule,NbFormFieldModule,  NbSelectModule,NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CompactSidebarComponent } from './compact-sidebar/compact-sidebar.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import { ShowTodosComponent } from './show-todos/show-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddTodoListComponent,
    ShowTodoListComponent,
    UpdateTodoListComponent,
    FilterPipe,
    ConfirmBoxComponent,
    CompactSidebarComponent,
    MainSidebarComponent,
    ShowTodosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbWindowModule,
    NbTabsetModule,
    NbSidebarModule.forRoot(),
    NbIconModule,
    NbListModule,
    NbActionsModule,
    NbInputModule,
    NbFormFieldModule,
    NbSelectModule,
    NbMenuModule.forRoot(),
    MatIconModule
  ],
  providers: [ShowTodoListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
