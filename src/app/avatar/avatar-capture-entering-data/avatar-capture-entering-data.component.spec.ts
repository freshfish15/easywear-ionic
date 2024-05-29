import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarCaptureEnteringDataComponent } from './avatar-capture-entering-data.component';

describe('AvatarCaptureEnteringDataComponent', () => {
  let component: AvatarCaptureEnteringDataComponent;
  let fixture: ComponentFixture<AvatarCaptureEnteringDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarCaptureEnteringDataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureEnteringDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
