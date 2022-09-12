import Adminjs from 'adminjs';
import { Adapter } from '../src';
import { initMysql, testCommon } from './utils/e2e';

describe('mysql', () => {
  beforeAll(async () => {
    Adminjs.registerAdapter(Adapter);
  });
  describe('test common', () => {
    testCommon(initMysql());
  });
});
