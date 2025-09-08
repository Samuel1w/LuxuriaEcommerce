import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsCraftsComponent } from './bts-crafts.component';

describe('BtsCraftsComponent', () => {
  let component: BtsCraftsComponent;
  let fixture: ComponentFixture<BtsCraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtsCraftsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtsCraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
