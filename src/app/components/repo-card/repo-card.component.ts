import { Component, Input, OnInit } from '@angular/core';
import { IRepo, Nullable } from 'src/types';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
})
export class RepoCardComponent implements OnInit {
  @Input() repo: Nullable<IRepo> = null;
  @Input() username = '';
  faLink = faLink;
  languages: string[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (!this.repo || !this.repo?.name) return;
    this.userService
      .getUserRepoLanguages(this.username, this.repo?.name)
      .subscribe((languages) => {
        this.languages = languages;
        this.loading = false;
      });
  }
}
