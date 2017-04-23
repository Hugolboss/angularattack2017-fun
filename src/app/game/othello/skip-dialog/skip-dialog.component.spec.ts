import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipDialogComponent } from './skip-dialog.component';

describe('SkipDialogComponent', () => {
  let component: SkipDialogComponent;
  let fixture: ComponentFixture<SkipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
