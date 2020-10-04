import { Request } from "koa";
import { verify, decode } from 'jsonwebtoken';
import config from '@config/api';

export async function koaAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if(securityName == 'jwt') {
    const token = request.get('Authorization');
    if(!token)
      throw new Error('No token provided');
    const decoded = <any>verify(token, config.JWT_SECRET);
    for(let scope of scopes ?? []) {
      if(!(scope in decoded)) {
        throw new Error('JWT does not contain required scope');
      }
    }
    return decoded;
  }
}