import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  public email: any;

  constructor(public route : ActivatedRoute) {
    this.email = this.route.snapshot.params['email'];
  }
  ngOnInit() {
  }
}