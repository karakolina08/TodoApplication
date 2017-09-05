import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { apiService } from "./api.service";
import { SuccessResponse } from "../models/successResponse";

@Injectable()
export class TodoService {

    // Variables

    // Constructor
    constructor(
        private _apiService: apiService
    ) {}

    // public functions
    getTodoList(userId: number,  getCompletedTask : boolean) : Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId.toString() );
        params.set('isCompleted', getCompletedTask.toString() );

        // call api
        return this._apiService.apiGet("api/todoService/todoListByUserId", params) //.apiGet("assets/data/todoList.json", params)
                .map((res : Response) => res.json());
    }

    saveTodoEntity(todoEntity: any) : Observable<any> {
        let objTodoEnt = JSON.stringify(todoEntity);
        return this._apiService.apiPost("api/todoService/saveTodoEntity", objTodoEnt)
                .map(res =>  (<SuccessResponse> res.json()).data);
    }

    deleteTodoEntity(todoEntity: any) : Observable<any> {
        let objTodoEnt = JSON.stringify(todoEntity);
        return this._apiService.apiPost("api/todoService/deleteTodoEntity", objTodoEnt)
                .map(res =>  (<SuccessResponse> res.json()).data);
    }

}