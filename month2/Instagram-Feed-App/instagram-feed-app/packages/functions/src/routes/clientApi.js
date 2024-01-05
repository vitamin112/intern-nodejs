import Router from 'koa-router';
import {handleAuth, handleGetMedia} from '../controllers/userController';

export default function clientApi() {
  const router = new Router({prefix: '/clientApi'});
  router.get('/getToken', handleAuth);
  router.get('/media', handleGetMedia);

  return router;
}
