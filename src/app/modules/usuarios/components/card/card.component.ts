import {Component, Input, OnInit} from '@angular/core';
import {UserListResponse} from "../../../../core/models/user.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() user: UserListResponse;

  constructor() {
    this.user = {
      id: 0,
      name: '',
      lastName: '',
      image: '',
      email: '',
      phone: 0,
      username: '',
      password:''
    }
  }

  ngOnInit(): void {
  }

}
