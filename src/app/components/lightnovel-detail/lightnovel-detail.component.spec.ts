import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightnovelDetailComponent } from './lightnovel-detail.component';

describe('LightnovelDetailComponent', () => {
  let component: LightnovelDetailComponent;
  let fixture: ComponentFixture<LightnovelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightnovelDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightnovelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
