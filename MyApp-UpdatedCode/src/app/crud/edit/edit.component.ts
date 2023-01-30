import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id:any
empObj:any
tableName:string = "Users"

  constructor(private actRouter:ActivatedRoute, private service:ApiService, private router:Router, private globalService:GlobalService) { }
  ngOnInit(): void {

    // Fetch the value of id from the current route
    this.actRouter.paramMap.subscribe((para)=>{
      this.id = para.get('id')
      console.log('ID==>',this.id)
    })



    // Use the above fetched ID, and read its latest value from the DB using service
    this.globalService.getRecord(this.tableName, this.id).subscribe((res)=>{
      console.log(res)
      this.empObj = {...res} // This will store the res in the emp object
    })

  }

  putData(data:any){
    const emp = {
      id: this.id,
      name: data.name,
      address: data.address,
      contact: data.contact,
      email: data.email
    }

    // this.service.updateRecord(emp).subscribe(()=>{
    //   alert('Record updated successfully !!')
    //   this.router.navigate(['/crud'])
    // })

    this.globalService.updateRecord(this.tableName, emp).subscribe(()=>{
      alert('Record updated successfully !!')
      this.router.navigate(['/crud'])
    })


  }

}
