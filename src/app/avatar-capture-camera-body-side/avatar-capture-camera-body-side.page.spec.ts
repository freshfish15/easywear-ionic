import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraBodySidePage } from './avatar-capture-camera-body-side.page';

describe('AvatarCaptureCameraBodyPage', () => {
  let component: AvatarCaptureCameraBodySidePage;
  let fixture: ComponentFixture<AvatarCaptureCameraBodySidePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarCaptureCameraBodySidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureCameraBodySidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
