import {accessControlList} from '../config/accessControlList';
import {login} from '../repositories/employeeRepository';

export async function handleLogin(ctx) {
  const userData = ctx.req.body;
  const user = await login(userData);

  if (user) {
    const permissions = user.role === 'admin' ? accessControlList.ADMIN : accessControlList.MEMBER;
    return (ctx.body = {data: {...user, permissions}, success: true});
  }
  return (ctx.body = {message: 'Login failed!', success: false});
}
