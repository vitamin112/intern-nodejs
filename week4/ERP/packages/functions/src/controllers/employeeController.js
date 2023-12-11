import {
  createEmployee,
  deleteEmployee,
  deleteEmployeeBulk,
  editEmployee,
  getEmployeeByEmail,
  getEmployeeById,
  getEmployees,
  importCSV
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

export async function handleDeleteBulk(ctx) {
  const {ids} = ctx.params.id || ctx.req.body;
  console.log(ids);
  const employee = await deleteEmployeeBulk(ids);

  if (employee) {
    return (ctx.body = {data: employee, success: true});
  }
  // return (ctx.body = {message: 'something went wrong!', success: false});
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

export async function handleImportFileCSV(ctx) {
  const data = ctx.req.body || [];

  const result = await importCSV(data);

  if (result) {
    return (ctx.body = {success: true, data: result});
  }

  return (ctx.body = {error: 'something went wrong!', data: []});
}
