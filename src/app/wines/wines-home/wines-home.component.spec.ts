import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinesHomeComponent } from './wines-home.component';

describe('WinesHomeComponent', () => {
  let component: WinesHomeComponent;
  let fixture: ComponentFixture<WinesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
