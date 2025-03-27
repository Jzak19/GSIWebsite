import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarspageComponent } from './carspage.component';

describe('CarspageComponent', () => {
  let component: CarspageComponent;
  let fixture: ComponentFixture<CarspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
