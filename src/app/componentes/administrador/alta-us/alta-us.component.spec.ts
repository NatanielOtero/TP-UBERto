import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaUsComponent } from './alta-us.component';

describe('AltaUsComponent', () => {
  let component: AltaUsComponent;
  let fixture: ComponentFixture<AltaUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
