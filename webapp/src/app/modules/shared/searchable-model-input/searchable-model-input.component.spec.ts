import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableModelInputComponent } from './searchable-model-input.component';

describe('SearchableModelInputComponent', () => {
  let component: SearchableModelInputComponent;
  let fixture: ComponentFixture<SearchableModelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SearchableModelInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchableModelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
