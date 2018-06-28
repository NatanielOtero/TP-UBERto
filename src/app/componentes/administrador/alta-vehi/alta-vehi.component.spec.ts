import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVehiComponent } from './alta-vehi.component';

describe('AltaVehiComponent', () => {
  let component: AltaVehiComponent;
  let fixture: ComponentFixture<AltaVehiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaVehiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaVehiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
