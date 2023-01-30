import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email:any
password:any
userData:any

public loginForm! : FormGroup

  constructor(private service:GlobalService, private router:Router, private formBuilder : FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   email:[''],
    //   password:['']
    // })
    this.service.signOut()
  }
  // login(){
  //   this.http.get<any>("http://localhost:3000/signupUsers")
  //   .subscribe(res=>{
  //      const user = res.find((a:any)=>{
  //       return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
  //      });
  //      if(user){
  //       alert("Login successful");
  //       this.loginForm.reset();
  //       this.router.navigate(['/product'])
  //      }else{
  //       alert("User not found")
  //      }
  //   },err=>{
  //     alert("Something went wrong")
  //   })
  // }


  getData(){
this.service.getRecords().subscribe((res)=>{

  const response = res
  this.userData = res 
  
  const data = this.userData.data.filter((item:any)=>{ return item.email == this.email && item.password == this.password})

  console.log('Dataa....==>',data);
  

  if( data.length >0){
    // console.log("Successful")
    this.service.signIn(this.email)
    this.router.navigate(['/product'])
  } else {
    // console.log("Failed")
    alert("Invalid credentials")
    this.email = ""
    this.password = ""
  }
})
  }



// new Forms


}
