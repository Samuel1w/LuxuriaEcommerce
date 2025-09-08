import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdetComponent } from './blogdet.component';

describe('BlogdetComponent', () => {
  let component: BlogdetComponent;
  let fixture: ComponentFixture<BlogdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogdetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
