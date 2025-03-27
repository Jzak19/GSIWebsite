import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousepageComponent } from './housepage.component';

describe('HousepageComponent', () => {
  let component: HousepageComponent;
  let fixture: ComponentFixture<HousepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
