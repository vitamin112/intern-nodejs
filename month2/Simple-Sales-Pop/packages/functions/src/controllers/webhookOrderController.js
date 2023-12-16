import {createNewNotification} from '../repositories/notificationRepository';

export async function createNotification(ctx) {
  await createNewNotification(ctx.req.body);
  ctx.body = {success: true};
}
