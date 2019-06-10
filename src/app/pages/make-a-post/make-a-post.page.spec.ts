import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAPostPage } from './make-a-post.page';

describe('MakeAPostPage', () => {
  let component: MakeAPostPage;
  let fixture: ComponentFixture<MakeAPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeAPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
