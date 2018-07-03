import { ErrorHandler, Injectable} from '@angular/core';
import { Http, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';



@Injectable()
export class MiHttpService  {
  token = localStorage.getItem('token');
  constructor(public http: HttpClient) { }
 
 public traer(url:string)
  {
    return this.http.get(url)
    .toPromise()
    .then(this.darDatos)    
    .catch( err => console.error(err));
  }

  public Alta(url: string , objeto: any)
  {
    return this.http.post(url,objeto)
    .toPromise()
    .then(this.darDatos)
    //.then(data => {console.log(data)})
    .catch( err => console.error(err));
  }
  

  public login(url: string, objeto: any) {

    
    return this.http.post(url, objeto)
      .toPromise()     
      .then(this.darDatos)
      .catch(this.handleError);
  }
  public delete(url: string, objeto: any) {
    this.http.request('DELETE',url,{
      body: objeto
    })
    .toPromise()
    .then(this.darDatos)
    .catch(this.handleError); 
      
 
  }
  public put(url: string, objeto: any) {
    return this.http.put(url,objeto)
      .toPromise()
      .then(this.darDatos)
      .catch(this.handleError);
  }
  /*
  delete(url: string, objeto: any) {
    return this.http.delete(url,
      new RequestOptions({
        body: objeto
      })
    )
      .toPromise()
      .then(data => { this.darDatos(data) })
      .catch(err => console.error(err));
  }

  put(url: string, objeto: any) {
    return this.http.put(url,objeto)
      .toPromise()
      .then(data => { this.darDatos(data)  })
      .catch(err => console.error(err));
  }

  /*getObservable(url: string) {

    return this.http.get(url).pipe(map(data => {
      let datos = data["_body"];
      datos = JSON.parse(datos);
      return datos;
    }));
    //.subscribe(data => {console.log("Observable"),console.log(data);});


  }*/

  private extraerDatos(resp: Response) {

    return resp.json() || {};

  }
  public handleError(error: Error) {
    
    console.log('It happens: ', error);
    throwError( new Error(error.message)); 
    //throw new Error(error.message);  
    return error;
 }
 

  darDatos(dato) {
    console.log(dato);
    /*let data
    data = JSON.parse(dato["_body"]);
    console.log(dato);*/
    //console.log(data["token"]);
    //localStorage.setItem("token",data["token"]);
    return dato;
  }


  /* postObservable(url:string , objeto : any)
   {
     return this.http.post(url,objeto).pipe(map(data => {
       let datos = data["_body"];
       datos = JSON.parse(datos);
       this.darDatos(datos);
     }));
   }*/
}
