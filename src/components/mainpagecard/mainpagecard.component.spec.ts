import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpagecardComponent } from './mainpagecard.component';

describe('MainpagecardComponent', () => {
  let component: MainpagecardComponent;
  let fixture: ComponentFixture<MainpagecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainpagecardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainpagecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
