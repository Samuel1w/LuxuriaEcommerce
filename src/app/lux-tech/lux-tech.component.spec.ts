import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxTechComponent } from './lux-tech.component';

describe('LuxTechComponent', () => {
  let component: LuxTechComponent;
  let fixture: ComponentFixture<LuxTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
