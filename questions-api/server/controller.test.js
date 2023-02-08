import '@testing-library/jest-dom';
require('iconv-lite').encodingExists('foo')

const {routetest, getAnswers} = require('./controller');


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

  test('responds to /qa/questions/:question_id/answers', () => {
    const req = { params: { question_id: 1}, query:{page: 1, count:100}  }  ;
    // console.log(req.params.question_id);


    const res = { value: '',

        // send: function(input) { this.value = input }
        send: function(input){this.value = input}
    };


    getAnswers(req, res);

    expect(res.value).toEqual('');
});

});