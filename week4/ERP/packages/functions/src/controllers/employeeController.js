import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployeeByEmail,
  getEmployeeById,
  getEmployees
} from '../repositories/employeeRepository';

export async function handleGetAll(ctx) {
  const employees = await getEmployees();

  if (employees) {
    return (ctx.body = {data: employees, success: true});
  }
  return (ctx.body = {message: 'something went wrong!', success: false});
}

export async function handleGetOne(ctx) {
  const {id} = ctx.params;
  const employee = await getEmployeeById(id);

  if (employee) {
    return (ctx.body = {data: employee, success: true});
  }
  return (ctx.body = {message: 'something went wrong!', success: false});
}

export async function handleDelete(ctx) {
  const id = ctx.params.id || ctx.req.body;

  const employee = await deleteEmployee(id);

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
  const newEmployee = await createEmployee(userData);
  return (ctx.body = {data: newEmployee, success: true});
}

export async function handleEdit(ctx) {
  const userData = ctx.req.body;

  const employee = await getEmployeeById(userData.id);

  if (employee) {
    const employeeUpdated = await editEmployee(userData);
    return (ctx.body = {success: true, message: 'Update successfully!', data: employeeUpdated});
  }

  return (ctx.body = {success: true, message: 'User are not found!', data: employee});
}
