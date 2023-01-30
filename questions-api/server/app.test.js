import '@testing-library/jest-dom';
import {cleanup} from '@testing-library/react';

// jest.useFakeTimers();
const {app,sum} = require('./app.js');
// afterEach(cleanup);
// afterAll(async (done) => { await db.connection.end(); done() });
// import sum from '../server/index.js';
// afterEach(() => {
//   cleanup();
//   // jest.mock('axios');
// });
// afterEach(cleanup);

// test('use jsdom in this test file', () => {
//   const element = document.createElement('div');
//   expect(element).not.toBeNull();
// });
test('adds 1 + 2 to equal 3', () => {
  // expect(1+2).toBe(3);
  expect(sum(1,2)).toBe(3);
});
