import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() numberOfPages?: number = 1;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Input() currentPage = 1;
  faRightArrow = faAnglesRight;
  faLeftArrow = faAnglesLeft;

  constructor() {}

  ngOnInit(): void {}

  private emitChange() {
    this.onPageChange.emit(this.currentPage);
  }

  handlePageIncrement() {
    if (this.currentPage === this.numberOfPages) return;
    this.currentPage++;
    this.emitChange();
  }

  handlePageDecrement() {
    if (this.currentPage === 1) return;
    this.currentPage--;
    this.emitChange();
  }

  handlePageSet(page: number) {
    this.currentPage = page;
    this.emitChange();
  }
}
