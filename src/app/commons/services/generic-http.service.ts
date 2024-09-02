import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  apiUrl: string = "";
  token: string = localStorage.getItem("accessToken")?.toString();
  constructor(
    private _http: HttpClient,
    private _error : ErrorService
  ) { }
  setApi(diffApi: boolean, api: string): string {
    if(diffApi)
      return api;
    return this.apiUrl + api;
  }
  setOptions(authorize: boolean) {
    if(authorize)
      return { headers : { "Authorization": 'Bearer ${localStorage.getItem(this.token)}'}}
    return {};
  }
  get<T>(api:string, callback: (res:T) => void, authorize: boolean = true, diffApi: boolean = false){
    this._http.get<T>('${this.setApi(diffApi,api)}',this.setOptions(authorize)).subscribe(
      {
        next: (res) => callback(res),
        error: (err: HttpErrorResponse) => this._error.errorHandler(err)
      }
    );
  }
  post<T>(api:string,model:any, callback: (res:T) => void, authorize: boolean = true, diffApi: boolean = false){
    this._http.post<T>('${this.setApi(diffApi,api)}',this.setOptions(authorize)).subscribe(
      {
        next: (res) => callback(res),
        error: (err: HttpErrorResponse) => this._error.errorHandler(err)
      }
    );
  }
}
