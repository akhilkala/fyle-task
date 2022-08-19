import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IRepo, IUserDetails, Nullable } from 'src/types';
import {
  faLocationDot,
  faExternalLink,
  faEnvelope,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  username = '';
  user: Nullable<IUserDetails> = null;
  repos: IRepo[] = [];
  faMapPin = faLocationDot;
  faExternalLink = faExternalLink;
  faTwitter = faTwitter;
  faEnvelope = faEnvelope;
  faSortDown = faSort;
  newestFirst = true;
  loading = true;
  reposLoading = false;
  currentPage = 1;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private fetchRepos(pageNumber: number, ascending = false) {
    this.reposLoading = true;
    this.userService
      .getUserRepos(this.username, pageNumber, ascending)
      .pipe(
        catchError((error) => {
          this.router.navigate(['error']);
          return throwError(() => error);
        })
      )
      .subscribe((repos) => {
        this.repos = repos;
        this.reposLoading = false;
      });
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.fetchRepos(this.currentPage);
    this.userService
      .getUserDetails(this.username)
      .pipe(
        catchError((error) => {
          if (error.error.message === 'Not Found')
            this.router.navigate(['error'], {
              state: { message: 'User not found' },
            });
          else this.router.navigate(['error']);
          return throwError(() => error);
        })
      )
      .subscribe((user: IUserDetails) => {
        this.user = user;
        this.loading = false;
      });
  }

  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchRepos(pageNumber, !this.newestFirst);
  }

  handleChangeOrder() {
    this.newestFirst = !this.newestFirst;
    this.currentPage = 1;
    this.fetchRepos(this.currentPage, !this.newestFirst);
  }
}
