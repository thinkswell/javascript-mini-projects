import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTaskComponent } from './get-task.component';

describe('GetTaskComponent', () => {
  let component: GetTaskComponent;
  let fixture: ComponentFixture<GetTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
