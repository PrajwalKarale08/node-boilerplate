// import * as mongoose from 'mongoose';
// const url = 'mongodb://127.0.0.1:27017/local';
import { Application, NextFunction, Request, Response } from 'express';
import * as os from 'os';
import * as process from 'process';
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import logger from '../../lib/logger';
import ApiError from '../../abstractions/ApiError';
import BaseApi from '../BaseApi';
import User from './connection';
import { isExpressionWithTypeArguments } from 'typescript';
// import { IServerTimeResponse, IResourceUsageResponse, IProcessInfoResponse, ISystemInfoResponse } from './system-status.types';

const fs = require('fs');
/*User Controller*/
export default class UserController extends BaseApi{
    constructor(express: Application){
        super();
        this.register(express);
    }
    public register(express: Application): void{
        express.use('/api', this.router);
        // this.router.get('/users', this.userList);
        this.router.post('/add_user', this.addUser);
        this.router.get('/all_users', this.all_users_list);
        this.router.get('/get_user/:id', this.get_user);
        this.router.put('/update_user/:id', this.update_user_by_id);
        this.router.delete('/delete_user/:id', this.delete_user_by_id);
    }
    public addUser(req: Request, res: Response, next: NextFunction): void{
        var user = new User(req.body);
        user.save((err: any) => {
            if(err){
                res.send(err);
            }
            else{   
                res.send(user);
            }
        });
    }
    public all_users_list(req: Request, res: Response, next: NextFunction): void {
        let users = User.find((err: any, users: any)=> {
            if(err){
                res.send("ERROR!!!!");
            }
            else{
                res.send(users);
            }
        });
    }
    public get_user(req: Request, res: Response, next: NextFunction): void{
        var user_by_id = User.findById(req.params.id, (err: any, user_by_id:any) => {
            if(err){
                res.send('ERROR!!');
            }
            else{
                res.send(user_by_id);
            }
        });
    }

    public update_user_by_id(req: Request, res: Response, next:NextFunction): void{
        var user_update = User.findByIdAndUpdate(
            req.params.id,
            req.body,
            (err:any, user_update:any) => {
                if(err){
                    res.send(err);
                }
                else{
                    res.send('UPDATED SUCCESSFULLY!!');
                }
            }
        );
    }
    public delete_user_by_id(req: Request, res: Response, next: NextFunction): void {
        let user = User.deleteOne({ _id: req.params.id }, (err: any) => {
            if (err) {
              res.send(err);
            } else {
              res.send("Successfully Deleted User");
            }
          });
    }

}
