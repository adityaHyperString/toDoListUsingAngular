import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactSidebarComponent } from './compact-sidebar.component';

describe('CompactSidebarComponent', () => {
  let component: CompactSidebarComponent;
  let fixture: ComponentFixture<CompactSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompactSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
