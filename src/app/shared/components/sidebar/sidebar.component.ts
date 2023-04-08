import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private _router: RouterModule) {
  }

  ngOnInit(): void {
  }

}
