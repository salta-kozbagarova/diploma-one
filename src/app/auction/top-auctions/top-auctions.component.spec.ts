import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAuctionsComponent } from './top-auctions.component';

describe('TopAuctionsComponent', () => {
  let component: TopAuctionsComponent;
  let fixture: ComponentFixture<TopAuctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAuctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
