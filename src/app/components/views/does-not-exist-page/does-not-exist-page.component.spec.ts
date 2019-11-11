import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoesNotExistPageComponent } from './does-not-exist-page.component';

describe('DoesNotExistPageComponent', () => {
  let component: DoesNotExistPageComponent;
  let fixture: ComponentFixture<DoesNotExistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoesNotExistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoesNotExistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
