import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsImportsComponent } from './bts-imports.component';

describe('BtsImportsComponent', () => {
  let component: BtsImportsComponent;
  let fixture: ComponentFixture<BtsImportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtsImportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtsImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
