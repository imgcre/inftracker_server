import { Controller, Route, Get, Security, Request } from "tsoa";

@Route('tests')
@Security('jwt', ['username'])
export class Test extends Controller {
  
  @Get()
  async get(
    @Request() request: any,
  ) {
    return {
      data: `hello ${request.user.username}`,
    }
  }
}