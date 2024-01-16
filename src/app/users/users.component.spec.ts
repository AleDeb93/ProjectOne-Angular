import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { ApiService } from '../services/api.service';
import { PaginatorService } from '../services/paginator.service';
import { UsersApiService } from './users-api.service';
import { MaterialModule } from '../modules/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockPaginatorService: jasmine.SpyObj<PaginatorService>;
  let mockUsersApiService: jasmine.SpyObj<UsersApiService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getList', 'searchRecord']);
    mockPaginatorService = jasmine.createSpyObj('PaginatorService', ['navigation', 'results']);
    mockUsersApiService = jasmine.createSpyObj('UsersApiService', ['deleteUser']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [MaterialModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: PaginatorService, useValue: mockPaginatorService },
        { provide: UsersApiService, useValue: mockUsersApiService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on initialization', async () => {
    const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]; // Dati di esempio
    mockApiService.getList.and.returnValue(of(users));

    await component.ngOnInit();

    expect(mockApiService.getList).toHaveBeenCalledWith(0, component.paginator.usersPage, component.paginator.usersResults);
    expect(component.users).toEqual(users);
    expect(component.loading).toBeFalse();
  });

  it('should navigate through users', async () => {
    const pageNumber = 2;

    await component.navigation(pageNumber);

    expect(mockPaginatorService.navigation).toHaveBeenCalledWith(0, pageNumber);
    expect(mockApiService.getList).toHaveBeenCalled(); // Controllo chiamata getList
  });

  // ...

  it('should delete user', async () => {
    const userId = 123; // Mock dei dati
    const deleteUserResponse = {}; // Mock della risposta

    mockUsersApiService.deleteUser.and.returnValue(of(deleteUserResponse));

    await component.deleteUser(userId);

    expect(mockUsersApiService.deleteUser).toHaveBeenCalledWith(userId);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Utente eliminato', '', { duration: 1000 });
    expect(mockApiService.getList).toHaveBeenCalled(); // Ensure getList was called after deleting user
  });

  it('should perform user search by name', async () => {
    const searchText = 'John'; // Dati di esempio
    const searchResult = [{ id: 1, name: 'John' }]; // Risultato di esempio

    mockApiService.searchRecord.and.returnValue(of(searchResult));
    component.text = searchText;

    await component.getUser();

    expect(mockApiService.searchRecord).toHaveBeenCalledWith(0, searchText.trim());
    expect(component.users).toEqual(searchResult);
    expect(component.noResults).toBeFalse();
  });

  it('should clear user search and repopulate user table', async () => {
    const originalUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]; // Dati di esempio
    const clearedText = '';

    mockApiService.getList.and.returnValue(of(originalUsers));
    component.text = 'John';
    component.noResults = true;

    await component.clear();

    expect(component.text).toEqual(clearedText);
    expect(component.noResults).toBeFalse();
    expect(mockApiService.getList).toHaveBeenCalled(); // Controllo la chiamata a GetList
  });
});
