import Router from 'koa-router';
import {handleAuth, handleGetAccount} from '../controllers/instagramController';

export default function instagram() {
  const router = new Router({prefix: '/instagram'});
  router.get('/getToken', handleAuth);
  router.get('/account', handleGetAccount);

  return router;
}
