import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicArtistComponent } from './music-artist.component';

describe('MusicArtistComponent', () => {
  let component: MusicArtistComponent;
  let fixture: ComponentFixture<MusicArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicArtistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
