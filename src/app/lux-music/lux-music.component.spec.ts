import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxMusicComponent } from './lux-music.component';

describe('LuxMusicComponent', () => {
  let component: LuxMusicComponent;
  let fixture: ComponentFixture<LuxMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxMusicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
