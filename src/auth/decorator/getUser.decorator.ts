import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// How to crate decorator 
// 
export const GetUser = createParamDecorator(
  // the data is decorator param
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx
      // some times the context can be websocket, rpc and http
      .switchToHttp()

      // you can also get response in here if your decorator handle response
      .getRequest();

    // get attached prop

    // if data is present the return the data props
    if(data){
      return request.user[data];
    }
    return request.user;
  },
);