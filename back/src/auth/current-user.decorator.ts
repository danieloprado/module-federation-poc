import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Returns the current authenticated user
 */
export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
