import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}
