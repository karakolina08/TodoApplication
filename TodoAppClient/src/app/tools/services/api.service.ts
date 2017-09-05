import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseConfiguration } from "../models/baseConfiguration";

@Injectable()
export class apiService{

    // private variables
    public _baseConfiguration : BaseConfiguration;
    private _baseUrl : string;
    private _options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

    // constructor
    constructor(private _http: Http) {}

    // private methods
    private handleError(error: Response) : Observable<Response> {
        return Observable.throw(error);
    }

    public getBaseConfiguration() : Observable<BaseConfiguration> {
        if(this._baseConfiguration){
            return Observable.of(this._baseConfiguration);
        } else {
            return this._http.request("configFile.json")
                .map(res => <BaseConfiguration> res.json())
                .do( res => console.log(JSON.stringify(res)) )
                //.subscribe(
                .do(
                    data => {
                        this._baseConfiguration = data;
                        this._baseUrl = this._baseConfiguration.baseUrl;
                    },
                    error => {
                        console.error("Error: "+ error);
                    }
                )
        }
         
    }

    // public methods
    public apiPost(urlDirAndPage: string, jsonBody: string) : Observable<Response> {
        if(this._baseConfiguration){
            return this._http.post(this._baseUrl + urlDirAndPage, jsonBody, this._options)
                .catch(this.handleError);
        }
        else {
            return this.getBaseConfiguration()
                        .flatMap(conf => this._http.post(this._baseUrl + urlDirAndPage, jsonBody, this._options))
                        .catch(this.handleError);

        } 
    }

    public apiPostUrlPrms(urlDirAndPage: string, params: URLSearchParams) : Observable<Response> {
        if(this._baseConfiguration){
            return this._http.post(this._baseUrl + urlDirAndPage, params)
                .catch(this.handleError);
        }
        else {
            return this.getBaseConfiguration()
                        .flatMap(conf => this._http.post(this._baseUrl + urlDirAndPage, params))
                        .catch(this.handleError);
        } 
    }

    public apiGet(urlDirAndPage: string, paramsSearch: URLSearchParams) : Observable<Response> {
        if(this._baseConfiguration){
            return this._http.get(this._baseUrl + urlDirAndPage, {search: paramsSearch})
                .catch(this.handleError);
        }
        else {
            return this.getBaseConfiguration()
                        .flatMap(conf => this._http.get(this._baseUrl + urlDirAndPage, {search: paramsSearch}) )
                        .catch(this.handleError);
        } 

        
    }



}