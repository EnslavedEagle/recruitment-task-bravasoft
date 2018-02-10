import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bv-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent implements OnInit {
  @Input() public rating: number;
  public stars: boolean[];

  constructor() { }

  ngOnInit() {
    this.stars = Array(10).fill(false).map((x, i) => i < this.rating);
  }

}
