import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie title', () => {
    const movieTitle = 'The Movie';
    component.movie = { id: 1, title: movieTitle, posterPath: 'poster.jpg' };
    fixture.detectChanges();
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.movie-title');
    expect(titleElement.textContent).toContain(movieTitle);
  });

  it('should emit event when movie is clicked', () => {
    const movieId = 123;
    component.movie = { id: movieId, title: 'The Movie', posterPath: 'poster.jpg' };
    fixture.detectChanges();
    spyOn(component.movieClicked, 'emit');
    const movieElement: HTMLElement = fixture.nativeElement.querySelector('.movie');
    movieElement.click();
    expect(component.movieClicked.emit).toHaveBeenCalledWith(movieId);
  });
});
