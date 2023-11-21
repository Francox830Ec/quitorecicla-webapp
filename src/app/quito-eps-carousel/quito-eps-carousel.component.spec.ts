import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitoEpsCarouselComponent } from './quito-eps-carousel.component';

describe('HomeCarouselComponent', () => {
  let component: QuitoEpsCarouselComponent;
  let fixture: ComponentFixture<QuitoEpsCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuitoEpsCarouselComponent]
    });
    fixture = TestBed.createComponent(QuitoEpsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
