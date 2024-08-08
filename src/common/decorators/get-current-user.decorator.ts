import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator((data: any | undefined, context: ExecutionContext)=> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user)
    if(!data) {
        return request.user;
    }
    return request.user[data];
})