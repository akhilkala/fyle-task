import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { IRepo } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static REPOS_PER_PAGE = 9;
  private repos: { [key: string]: IRepo[] } = {};
  private repoLanguages: { [key: string]: string[] } = {};

  constructor(private http: HttpClient) {}

  private getUserDataUrl(username: string) {
    return `https://api.github.com/users/${username}`;
  }

  private getUserReposUrl(username: string, page: number, ascending = false) {
    return `https://api.github.com/users/${username}/repos?page=${page}&per_page=${
      UserService.REPOS_PER_PAGE
    }&sort=created&direction=${ascending ? 'asc' : 'desc'}`;
  }

  private getUserRepoLanguagesUrl(username: string, repo: string) {
    return `https://api.github.com/repos/${username}/${repo}/languages`;
  }

  getUserDetails(username: string) {
    return this.http.get(this.getUserDataUrl(username)).pipe(
      map((data: any) => {
        return {
          name: data.name,
          avatar_url: data.avatar_url,
          login: data.login,
          html_url: data.html_url,
          blog: data.blog,
          location: data.location,
          number_of_pages: Math.ceil(
            data.public_repos / UserService.REPOS_PER_PAGE
          ),
          bio: data.bio,
          email: data.email,
          twitter_username: data.twitter_username,
        };
      })
    );
  }

  getUserRepos(
    username: string,
    page: number,
    ascending = false
  ): Observable<IRepo[]> {
    if (this.repos[`${page}--${ascending ? 'asc' : 'desc'}`])
      return of(this.repos[page]);
    return this.http.get(this.getUserReposUrl(username, page, ascending)).pipe(
      map((data: any) => {
        const formatted = data.map((repo: any) => {
          return {
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            created_at: repo.created_at,
            languages_url: repo.languages_url,
          };
        });
        this.repos[page] = formatted;
        return formatted;
      })
    );
  }

  getUserRepoLanguages(username: string, repo: string) {
    if (this.repoLanguages[repo]) return of(this.repoLanguages[repo]);
    return this.http.get(this.getUserRepoLanguagesUrl(username, repo)).pipe(
      map((data) => {
        const output = Object.keys(data);
        this.repoLanguages[repo] = output;
        return output;
      })
    );
  }
}
