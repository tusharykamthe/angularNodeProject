import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  tableName:string = "Users"

  constructor(private service:ApiService, private router:Router, private globalService:GlobalService) { }

  ngOnInit(): void {
  }

  addData(data:any){
    const empObj = {
      name: data.name,
      address: data.address,
      contact: data.contact,
      email:data.email,
    }

// this.service.addRecord(empObj).subscribe(()=>{
//   alert('Record added successfully!')
//   this.router.navigate(['/crud'])
// })

this.globalService.addRecord(this.tableName, empObj).subscribe(()=>{
  alert('Record added successfully!')
  this.router.navigate(['/crud'])
})

  }
}
