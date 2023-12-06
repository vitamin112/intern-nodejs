import {login} from '../repositories/employeeRepository';

export async function handleLogin(ctx) {
  const userData = ctx.req.body;
  const user = await login(userData);

  if (user) {
    return (ctx.body = {data: user, success: true});
  }
  return (ctx.body = {message: 'Login failed!', success: false});
}
