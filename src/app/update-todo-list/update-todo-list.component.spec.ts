import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTodoListComponent } from './update-todo-list.component';

describe('UpdateTodoListComponent', () => {
  let component: UpdateTodoListComponent;
  let fixture: ComponentFixture<UpdateTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTodoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
