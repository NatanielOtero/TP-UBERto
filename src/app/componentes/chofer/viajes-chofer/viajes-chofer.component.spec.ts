import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesChoferComponent } from './viajes-chofer.component';

describe('ViajesChoferComponent', () => {
  let component: ViajesChoferComponent;
  let fixture: ComponentFixture<ViajesChoferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesChoferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
