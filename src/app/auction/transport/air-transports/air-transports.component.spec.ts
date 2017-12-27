import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirTransportsComponent } from './air-transports.component';

describe('AirTransportsComponent', () => {
  let component: AirTransportsComponent;
  let fixture: ComponentFixture<AirTransportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirTransportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirTransportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
