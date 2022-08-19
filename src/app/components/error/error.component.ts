import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() message = 'Something went wrong';
  lottieOptions: AnimationOptions = {
    path: 'assets/error.json',
    loop: false,
  };

  constructor(private router: Router) {
    //@ts-ignore
    const message = this.router.getCurrentNavigation()?.extras.state.message;
    if (message) this.message = message;
  }

  ngOnInit(): void {}
}
