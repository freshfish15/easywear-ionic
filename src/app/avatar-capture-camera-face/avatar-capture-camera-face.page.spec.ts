import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraFacePage } from './avatar-capture-camera-face.page';

describe('AvatarCaptureCameraFacePage', () => {
  let component: AvatarCaptureCameraFacePage;
  let fixture: ComponentFixture<AvatarCaptureCameraFacePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarCaptureCameraFacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureCameraFacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
