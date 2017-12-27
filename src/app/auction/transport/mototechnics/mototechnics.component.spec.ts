import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MototechnicsComponent } from './mototechnics.component';

describe('MototechnicsComponent', () => {
  let component: MototechnicsComponent;
  let fixture: ComponentFixture<MototechnicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MototechnicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MototechnicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
