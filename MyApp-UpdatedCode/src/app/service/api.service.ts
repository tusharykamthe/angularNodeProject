import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

// baseURL ="http://localhost:3000/Users"
baseURL ="http://localhost:3000/Users"

  constructor(private http : HttpClient) { }

  getRecords(){
   return this.http.get(this.baseURL)
  }
  // GET Request ('R' in the CRUD)

  getRecord(){
    // return this.http.get<any>("http://localhost:3000/Items")
    return this.http.get<any>("http://localhost:4500/api/v1/product/listsProduct")
    .pipe(map((res:any)=>{
      // const Data = res.data;
      return res;
    }))
  }
// getRecord(id:any){
//   let getURL = `${this.baseURL}/${id}`
//   return this.http.get(getURL)
// }


  // DELETE Request ('D' in CRUD)
deleteRecord(id:any){
  let deleteURL = `${this.baseURL}/${id}`
  return this.http.delete(deleteURL)
}

//POST Request ('C' in the CRUD)
addRecord(empData:any){
  return this.http.post(this.baseURL, empData)
}

//PUT Request  (U in the CRUD)
updateRecord(empData: any){
  let putURL = `${this.baseURL}/${empData.id}`
  return this.http.put(putURL, empData)
}
}
// https://fakestoreapi.com/products/
// \src\shared\api