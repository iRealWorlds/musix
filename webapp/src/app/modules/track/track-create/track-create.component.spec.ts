import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCreateComponent } from './track-create.component';

describe('TrackCreateComponent', () => {
  let component: TrackCreateComponent;
  let fixture: ComponentFixture<TrackCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
