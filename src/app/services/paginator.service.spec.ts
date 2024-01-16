import { TestBed } from '@angular/core/testing';
import { PaginatorService } from './paginator.service';

describe('PaginatorService', () => {
  let service: PaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginatorService]
    });
    service = TestBed.inject(PaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize paginator variables', () => {
    expect(service.usersPage).toEqual(1);
    expect(service.usersResults).toEqual(10);
    expect(service.postsPage).toEqual(1);
    expect(service.postsResults).toEqual(10);
  });

  it('should navigate correctly among user pages', () => {
    service.usersPage = 3;
    service.navigation(0, 0);
    expect(service.usersPage).toEqual(2);

    service.navigation(0, 1);
    expect(service.usersPage).toEqual(3);

    service.navigation(0, 2);
    expect(service.usersPage).toEqual(1);
  });

  it('should navigate correctly among post pages', () => {
    service.postsPage = 4;
    service.navigation(1, 0);
    expect(service.postsPage).toEqual(3);

    service.navigation(1, 1);
    expect(service.postsPage).toEqual(4);

    service.navigation(1, 2);
    expect(service.postsPage).toEqual(1);
  });

  it('should set the correct number of results for users', () => {
    service.results(0, 20);
    expect(service.usersResults).toEqual(20);
  });

  it('should set the correct number of results for posts', () => {
    service.results(1, 15);
    expect(service.postsResults).toEqual(15);
  });
});
