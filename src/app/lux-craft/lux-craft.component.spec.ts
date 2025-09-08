import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxCraftComponent } from './lux-craft.component';

describe('LuxCraftComponent', () => {
  let component: LuxCraftComponent;
  let fixture: ComponentFixture<LuxCraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxCraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
