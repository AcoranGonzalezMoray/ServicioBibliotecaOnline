import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAudiobookComponent } from './app-audiobook.component';

describe('AppAudiobookComponent', () => {
  let component: AppAudiobookComponent;
  let fixture: ComponentFixture<AppAudiobookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAudiobookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAudiobookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
