import { Component, Input, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() width = 400;
  @Input() screenCenter = false;
  lottieOptions: AnimationOptions = {
    path: 'assets/loading.json',
  };

  constructor() {}

  ngOnInit(): void {}
}
