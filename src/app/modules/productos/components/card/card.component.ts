import {Component, Input, OnInit} from '@angular/core';
import {ProductListResponse} from "../../../../core/models/product.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: ProductListResponse;

  constructor() {
    this.product = {
      id: 0,
      name: '',
      description: '',
      image: '',
      purchasePrice: 0,
      salePrice: 0,
      stock: 0
    }
  }

  ngOnInit(): void {
  }

}
