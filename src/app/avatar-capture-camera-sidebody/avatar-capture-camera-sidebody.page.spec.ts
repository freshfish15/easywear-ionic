import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraSidebodyPage } from './avatar-capture-camera-sidebody.page';

describe('AvatarCaptureCameraSidebodyPage', () => {
  let component: AvatarCaptureCameraSidebodyPage;
  let fixture: ComponentFixture<AvatarCaptureCameraSidebodyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarCaptureCameraSidebodyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureCameraSidebodyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
