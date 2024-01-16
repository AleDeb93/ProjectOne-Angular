import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SingleUserComponent } from './single-user.component';
import { ApiService } from '../../services/api.service';
import { UsersApiService } from '../users-api.service';
import { of } from 'rxjs';
import { SharedModule } from '../../modules/shared/shared.module';

describe('SingleUserComponent', () => {
  let component: SingleUserComponent;
  let fixture: ComponentFixture<SingleUserComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockUsersApiService: jasmine.SpyObj<UsersApiService>;
  const userId = '123';

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['relatedRecords']);
    mockUsersApiService = jasmine.createSpyObj('UsersApiService', ['getUserDetails']);
    mockApiService.relatedRecords.and.returnValue(of([]));
    mockUsersApiService.getUserDetails.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [SingleUserComponent],
      imports: [SharedModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: UsersApiService, useValue: mockUsersApiService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (param: string) => userId } }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user details and related posts/comments', async () => {
    const userData = { id: userId };
    const postsData = [{ userId: userId, id: '1' }];
    const commentsData = [{ postId: '1' }];

    mockUsersApiService.getUserDetails.and.returnValue(of(userData));
    mockApiService.relatedRecords.withArgs(0, userId, 1).and.returnValue(of(postsData));
    mockApiService.relatedRecords.withArgs(1, '1', 2).and.returnValue(of(commentsData));

    await component.ngOnInit();

    expect(mockUsersApiService.getUserDetails).toHaveBeenCalledWith(userId);
    expect(mockApiService.relatedRecords).toHaveBeenCalledWith(0, userId, 1);
    expect(mockApiService.relatedRecords).toHaveBeenCalledWith(1, '1', 2);
    expect(component.user).toEqual(userData);
    expect(component.posts).toEqual(postsData);
    expect(component.comments).toEqual(commentsData);
    expect(component.loading).toBeFalse();
  });
});
