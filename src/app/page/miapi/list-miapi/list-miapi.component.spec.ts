import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMiapiComponent } from './list-miapi.component';

describe('ListMiapiComponent', () => {
  let component: ListMiapiComponent;
  let fixture: ComponentFixture<ListMiapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMiapiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMiapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
