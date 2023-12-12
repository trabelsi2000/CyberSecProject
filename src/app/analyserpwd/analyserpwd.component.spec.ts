import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyserpwdComponent } from './analyserpwd.component';

describe('AnalyserpwdComponent', () => {
  let component: AnalyserpwdComponent;
  let fixture: ComponentFixture<AnalyserpwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyserpwdComponent]
    });
    fixture = TestBed.createComponent(AnalyserpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
