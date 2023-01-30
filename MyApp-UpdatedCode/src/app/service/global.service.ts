import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  navigate(arg0: string[]) {
    throw new Error('Method not implemented.');
  }

  baseURL:string ="http://localhost:4500/api/v1/user/logIn"
    // baseURL:string =" http://localhost:3000"
  constructor(private httpClient:HttpClient) { }
  
  getRecords(){
    // const url = `${this.baseURL}/${path}`
        const url = `${this.baseURL}`
    return this.httpClient.get(url)
  }
   // GET Request ('R' in the CRUD)
   getRecord(path:string, id:any){
    const url = `${this.baseURL}/${path}/${id}`
    return this.httpClient.get<any>(url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //DELETE Request ('D' in the CRUD)
  deleteRecords(path:string, id:any){
    const url = `${this.baseURL}/${path}/${id}`
    return this.httpClient.delete(url)
  }

  //Post Request ('C' in the CRUD)
  addRecord(path:string, empData:any){
    const url = `${this.baseURL}/${path}`
    return this.httpClient.post(url, empData)
  }
  
  //PUT Request  (U in the CRUD)
updateRecord(path:string, empData: any){
  const url = `${this.baseURL}/${path}/${empData.id}`
  return this.httpClient.put(url, empData)
}


signIn(user:any){
  sessionStorage.setItem("userkey", user)
}

signOut(){
  sessionStorage.removeItem("userkey")
}
}