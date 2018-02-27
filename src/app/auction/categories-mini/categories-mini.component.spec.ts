import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMiniComponent } from './categories-mini.component';

describe('CategoriesMiniComponent', () => {
  let component: CategoriesMiniComponent;
  let fixture: ComponentFixture<CategoriesMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
