import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleProtectedViewComponent } from './sample-protected-view.component';

describe('SampleProtectedViewComponent', () => {
  let component: SampleProtectedViewComponent;
  let fixture: ComponentFixture<SampleProtectedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleProtectedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleProtectedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
