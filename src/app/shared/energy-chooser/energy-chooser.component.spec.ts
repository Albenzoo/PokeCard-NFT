import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyChooserComponent } from './energy-chooser.component';

describe('EnergyChooserComponent', () => {
  let component: EnergyChooserComponent;
  let fixture: ComponentFixture<EnergyChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
