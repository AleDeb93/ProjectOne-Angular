import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { PostsModule } from './posts.module';
import { ApiService } from '../services/api.service';
import { PaginatorService } from '../services/paginator.service';
import { of, throwError } from 'rxjs';
import { MaterialModule } from '../modules/material/material.module';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockPaginatorService: jasmine.SpyObj<PaginatorService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getList', 'relatedRecords', 'searchRecord']);
    mockPaginatorService = jasmine.createSpyObj('PaginatorService', ['navigation', 'results']);

    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: PaginatorService, useValue: mockPaginatorService },
      ],
      imports: [MaterialModule, PostsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when loading posts', fakeAsync(() => {
    spyOn(console, 'error');
    mockApiService.getList.and.returnValue(throwError('Error loading posts'));

    component.ngOnInit();
    tick();

    expect(component.loading).toBe(false);
    expect(component.noResults).toBe(true);
    expect(console.error).toHaveBeenCalledWith('Non è stato possibile ottenere i dati richiesti');
  }));

  it('should navigate and load posts', fakeAsync(() => {
    const pageNumber = 2;
    component.navigation(pageNumber);
    tick();

    expect(mockPaginatorService.navigation).toHaveBeenCalledWith(1, pageNumber);
    expect(mockApiService.getList).toHaveBeenCalledWith(1, mockPaginatorService.postsPage, mockPaginatorService.postsResults);
  }));
});
