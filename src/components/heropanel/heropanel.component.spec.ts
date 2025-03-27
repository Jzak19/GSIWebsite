import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeropanelComponent } from './heropanel.component';

describe('HeropanelComponent', () => {
  let component: HeropanelComponent;
  let fixture: ComponentFixture<HeropanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeropanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeropanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
