import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomingAndSpendingComponent } from './encoming-and-spending.component';

describe('EncomingAndSpendingComponent', () => {
  let component: EncomingAndSpendingComponent;
  let fixture: ComponentFixture<EncomingAndSpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncomingAndSpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncomingAndSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
