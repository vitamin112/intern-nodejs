import Router from 'koa-router';
import {handleAuth} from '../controllers/userController';
import {handleGetMedia} from '../controllers/mediaController';

export default function clientApi() {
  const router = new Router({prefix: '/clientApi'});
  router.get('/getToken', handleAuth);
  router.get('/media', handleGetMedia);

  return router;
}
