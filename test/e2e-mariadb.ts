import Adminjs from 'adminjs';
import { Adapter } from '../src';
import { initMariadb, testCommon } from './utils/e2e';

describe('mariadb', () => {
  beforeAll(async () => {
    Adminjs.registerAdapter(Adapter);
  });
  describe('test common', () => {
    testCommon(initMariadb());
  });
});
