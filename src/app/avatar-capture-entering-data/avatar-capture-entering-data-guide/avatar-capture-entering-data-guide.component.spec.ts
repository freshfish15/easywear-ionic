import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AvatarCaptureEnteringDataGuideComponent} from './avatar-capture-entering-data-guide.component';

describe('AvatarCaptureEnteringDataGuideComponent', () => {
  let component: AvatarCaptureEnteringDataGuideComponent;
  let fixture: ComponentFixture<AvatarCaptureEnteringDataGuideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarCaptureEnteringDataGuideComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarCaptureEnteringDataGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
