import '@testing-library/jest-dom';

const {routetest} = require('./controller');


describe('Test Handlers', function () {

  test('responds to /', () => {
      const req = {  };

      const res = { text: '',
          send: function(input) { this.text = input }
      };
      routetest(req, res);

      expect(res.text).toEqual('API service up');
  });

  // test('responds to /hello/:name', () => {
  //     const req = { params: { name: 'Bob' }  };

  //     const res = { text: '',
  //         send: function(input) { this.text = input }
  //     };
  //     hello(req, res);

  //     expect(res.text).toEqual('hello Bob!');
  // });

});