import Router from 'koa-router';
import {handleAuth} from '../controllers/instagramController';

export default function instagramAuth() {
  const router = new Router({prefix: '/instagramAuth'});
  router.get('/getToken', handleAuth);

  return router;
}
