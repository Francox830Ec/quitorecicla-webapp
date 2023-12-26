import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReciclableCarouselComponent } from './material-reciclable-carousel.component';

describe('MaterialReciclableCarouselComponent', () => {
  let component: MaterialReciclableCarouselComponent;
  let fixture: ComponentFixture<MaterialReciclableCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialReciclableCarouselComponent]
    });
    fixture = TestBed.createComponent(MaterialReciclableCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
