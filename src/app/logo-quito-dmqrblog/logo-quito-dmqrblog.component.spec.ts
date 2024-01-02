import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoQuitoDMQRBlogComponent } from './logo-quito-dmqrblog.component';

describe('LogoQuitoDMQRBlogComponent', () => {
  let component: LogoQuitoDMQRBlogComponent;
  let fixture: ComponentFixture<LogoQuitoDMQRBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoQuitoDMQRBlogComponent]
    });
    fixture = TestBed.createComponent(LogoQuitoDMQRBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
