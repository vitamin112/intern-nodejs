import {
  create,
  getEmployeeByEmail,
  getEmployeeById,
  getEmployees
} from '../repositories/employeeRepository';

export async function handlerGetAll(ctx) {
  const employees = await getEmployees();

  if (employees) {
    return (ctx.body = {data: employees, success: true});
  }
  return (ctx.body = {message: 'something went wrong!', success: false});
}

export async function handlerGetOne(ctx) {
  const {id} = ctx.params;
  const employee = await getEmployeeById(id);

  if (employee) {
    return (ctx.body = {data: employee, success: true});
  }
  return (ctx.body = {message: 'something went wrong!', success: false});
}

export async function handleCreate(ctx) {
  const userData = ctx.req.body;

  const employee = await getEmployeeByEmail(userData.email);

  if (employee) {
    return (ctx.body = {success: false, error: 'Email has been used!'});
  }
  const newEmployee = await create(userData);
  return (ctx.body = {data: newEmployee, success: true});
}
