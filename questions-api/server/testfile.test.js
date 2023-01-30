import '@testing-library/jest-dom';
import sums from './testfile.js';
import mysql from 'mysql2';

// afterAll(() => {
//   mysql.connection.end;
//   server.close();
// });

describe ('test', ()=>{
  test('adds 1 + 2 to equal 3', () => {
    // expect(1+2).toBe(3);
    expect(sums(1,2)).toBe(3);
  });

});


