import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbWindowModule,
  NbTabsetModule,
  NbSidebarModule,
  NbIconModule,
  NbListModule,
  NbActionsModule,
  NbInputModule,
  NbFormFieldModule,
  NbSelectModule,
  NbMenuModule,
  NbDialogModule,
  NbAccordionModule,
  NbPopoverModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatIconModule } from '@angular/material/icon';

//SLICK MODULE
import { SlickCarouselModule } from 'ngx-slick-carousel';

// COMPONENTS
import { SidebarComponent } from './sidebar/sidebar.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddFolderComponent } from './sidebar/add-folder/add-folder.component';
import { AddEditTodoComponent } from './todo-list/add-edit-todo/add-edit-todo.component';
import { AddFileComponent } from './sidebar/add-file/add-file.component';
import { ConfirmBoxComponent } from './todo-list/confirm-box/confirm-box.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { OpenFileComponent } from './todo-list/open-file/open-file.component';
import { SafePipe } from './todo-list/open-file/safe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TodoListComponent,
    AddFolderComponent,
    AddEditTodoComponent,
    AddFileComponent,
    ConfirmBoxComponent,
    FilterPipePipe,
    OpenFileComponent,
    SafePipe,

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
    MatIconModule,
    NbDialogModule.forRoot(),
    NbAccordionModule,
    NbPopoverModule,
    SlickCarouselModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
