import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirViajeComponent } from './pedir-viaje.component';

describe('PedirViajeComponent', () => {
  let component: PedirViajeComponent;
  let fixture: ComponentFixture<PedirViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
