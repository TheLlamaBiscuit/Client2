import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionsComponent } from './cd.component';

describe('ConcessionsComponent', () => {
  let component: ConcessionsComponent;
  let fixture: ComponentFixture<ConcessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
