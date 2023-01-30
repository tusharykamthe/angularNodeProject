import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usersData:any
  tableName:string = "Users"

  constructor(private myservice:ApiService, private globalService:GlobalService) { }

  ngOnInit(): void {
   this.getRecords()
  }

  getRecords(){
    // this.myservice.getRecords().subscribe((res)=>{
    //   this.usersData = res
    // })
    //we pass the name of the table as a parameter to the getRecords() methods
this.globalService.getRecords().subscribe((res)=>{
  console.log('res-->>',res); 

  this.usersData = res
})

  }

delete(id:any){
  if (confirm(`Are you sure you want to delete record with id: ${id}`)){
    // this.myservice.deleteRecord(id).subscribe(()=>{
    //   alert('Record deleted successfully!')
    //   this.getRecords()
    // })

    this.globalService.deleteRecords(this.tableName, id).subscribe(()=>{
      alert('Record deleted successfully!')
        this.getRecords()
    })
  }
}

}
