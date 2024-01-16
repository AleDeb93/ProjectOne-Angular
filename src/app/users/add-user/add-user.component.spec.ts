import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { UsersApiService } from '../users-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let mockUsersApiService: jasmine.SpyObj<UsersApiService>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockUsersApiService = jasmine.createSpyObj('UsersApiService', ['createUser']);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [FormsModule],
      providers: [
        { provide: UsersApiService, useValue: mockUsersApiService },
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully create a new user', () => {
    const userForm: NgForm = { resetForm: jasmine.createSpy('resetForm') } as any;
    mockUsersApiService.createUser.and.returnValue(of({}));

    component.submit(userForm);

    expect(mockUsersApiService.createUser).toHaveBeenCalledWith(component.newUser);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith('Utente creato', '', { duration: 1000 });
    expect(userForm.resetForm).toHaveBeenCalled();
  });

  it('should handle error while creating user', () => {
    const userForm: NgForm = { resetForm: jasmine.createSpy('resetForm') } as any;
    const errorMessage = 'Error creating user';
    mockUsersApiService.createUser.and.returnValue(throwError(errorMessage));

    component.submit(userForm);

    expect(mockUsersApiService.createUser).toHaveBeenCalledWith(component.newUser);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith(`Errori nell'inserimento dei dati`, '', { duration: 1000 });
    expect(userForm.resetForm).not.toHaveBeenCalled();
  });
});
