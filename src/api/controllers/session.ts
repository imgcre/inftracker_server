import { Route, Post, Controller, BodyProp, Res, TsoaResponse } from "tsoa";
import * as jwt from 'jsonwebtoken';
import config from '@config/api';

@Route('sessions')
export class Session extends Controller {
  @Post()
  async create(
    @BodyProp() username: string,
    @BodyProp() password: string,
    @Res() unauthorized: TsoaResponse<401, {msg: string}> 
  ) {
    console.log({username, password});
    if(password !== '233')
      unauthorized(401, {msg: 'Incorrect username or password'});

    return {
      data: jwt.sign({username}, config.JWT_SECRET),
    };
  }
}