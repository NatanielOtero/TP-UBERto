import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliViajesComponent } from './cli-viajes.component';

describe('CliViajesComponent', () => {
  let component: CliViajesComponent;
  let fixture: ComponentFixture<CliViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
