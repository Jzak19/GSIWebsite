import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagetextpanelComponent } from './imagetextpanel.component';

describe('ImagetextpanelComponent', () => {
  let component: ImagetextpanelComponent;
  let fixture: ComponentFixture<ImagetextpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagetextpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagetextpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
