import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.signOut();
    this.route.navigate(['']); 
  }

}
