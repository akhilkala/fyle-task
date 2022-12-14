import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.router.navigate(['user', this.username]);
  }
}
