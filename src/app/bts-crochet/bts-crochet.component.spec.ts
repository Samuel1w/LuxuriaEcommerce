import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsCrochetComponent } from './bts-crochet.component';

describe('BtsCrochetComponent', () => {
  let component: BtsCrochetComponent;
  let fixture: ComponentFixture<BtsCrochetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtsCrochetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtsCrochetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
