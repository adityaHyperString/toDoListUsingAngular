import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTodoListComponent } from './show-todo-list.component';

describe('ShowTodoListComponent', () => {
  let component: ShowTodoListComponent;
  let fixture: ComponentFixture<ShowTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTodoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
