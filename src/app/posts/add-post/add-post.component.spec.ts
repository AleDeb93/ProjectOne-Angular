import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Assicurati di aggiungere questa importazione
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Assicurati di aggiungere questa importazione
import { AddPostComponent } from './add-post.component';

describe('AddPostComponent', () => {
  let fixture;
  let component: AddPostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [FormsModule, HttpClientTestingModule], // Assicurati di aggiungere questo
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
