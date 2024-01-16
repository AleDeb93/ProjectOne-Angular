import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddPostComponent } from './add-post.component';
import { ActivatedRoute } from '@angular/router';
import { PostsModule } from '../posts.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostsApiService } from '../posts-api.service';
import { NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let mockPostsApiService: jasmine.SpyObj<PostsApiService>;
  let mockNgForm: Partial<NgForm>;

  beforeEach(async () => {
    mockPostsApiService = jasmine.createSpyObj('PostsApiService', ['createUserPost']);
    mockNgForm = {
      resetForm: jasmine.createSpy('resetForm')
    };

    await TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [MatSnackBarModule, PostsModule],
      providers: [
        { provide: PostsApiService, useValue: mockPostsApiService },
        { provide: ActivatedRoute, useValue: {} }  
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit post successfully', () => {
    const mockResponse = {}; // Mock della risposta
    mockPostsApiService.createUserPost.and.returnValue(of(mockResponse));

    component.newPost = { user_id: '123', title: 'Test Title', body: 'Test Body' };
    component.submit(mockNgForm as NgForm);

    expect(mockPostsApiService.createUserPost).toHaveBeenCalledWith('123', component.newPost);
    expect(mockNgForm.resetForm).toHaveBeenCalled();
  });

  it('should handle error on submit', () => {
    const mockError = new Error('API Error');
    mockPostsApiService.createUserPost.and.returnValue(throwError(mockError));

    component.newPost = { user_id: '123', title: 'Test Title', body: 'Test Body' };
    component.submit(mockNgForm as NgForm);

    expect(mockPostsApiService.createUserPost).toHaveBeenCalledWith('123', component.newPost);
    expect(mockNgForm.resetForm).not.toHaveBeenCalled();
  });
});
