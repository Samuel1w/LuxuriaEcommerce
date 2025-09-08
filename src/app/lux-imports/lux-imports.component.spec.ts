import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxImportsComponent } from './lux-imports.component';

describe('LuxImportsComponent', () => {
  let component: LuxImportsComponent;
  let fixture: ComponentFixture<LuxImportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxImportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
