import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReciclableQuestionCarouselComponent } from './material-reciclable-question-carousel.component';

describe('MaterialReciclableQuestionCarouselComponent', () => {
  let component: MaterialReciclableQuestionCarouselComponent;
  let fixture: ComponentFixture<MaterialReciclableQuestionCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialReciclableQuestionCarouselComponent]
    });
    fixture = TestBed.createComponent(MaterialReciclableQuestionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
