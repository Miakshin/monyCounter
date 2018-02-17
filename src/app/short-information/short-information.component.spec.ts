import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortInformationComponent } from './short-information.component';

describe('ShortInformationComponent', () => {
  let component: ShortInformationComponent;
  let fixture: ComponentFixture<ShortInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
