import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email = '';
  password = '';
  loginSuccess:any;
  hideLoginStatus = true;

  constructor(private http: HttpClient, private router: Router){}

  login(){
    console.log(this.email, this.password);
    this.http.post("http://localhost:4700/validateuser", { email: this.email, password:this.password}).subscribe(res => {
      
    if(res){
      this.router.navigate(['/admin']);
    }
    else{
      this.hideLoginStatus = false;
      this.loginSuccess = res;
    }
    })
  }
  ngOnInit(): void {
    
  }

}

