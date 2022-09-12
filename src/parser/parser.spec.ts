import { parse } from '.';

describe('parser', () => {
  it('should throw error', () => {
    expect(() => parse('postgres' as any, { database: 'dbname' })).toThrow(
      /is not supported./
    );
  });
});
