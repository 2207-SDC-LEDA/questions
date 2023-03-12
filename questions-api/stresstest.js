import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 1000, // to allocate runtime resources     preAll
      maxVUs: 1000,
      rate: 1000, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
  // vus: 1000,
  // duration: '30s',

};

export default function () {

  let product_id = Math.floor(Math.random() * (1000011 - 900009 + 1)) + 900009;
  let answer_id=Math.floor(Math.random() * (6879300 - 680000 + 1)) +  680000;
  let question_id=Math.floor(Math.random() * (3518962 - 310000 + 1)) +  310000;
  const payload = JSON.stringify({
    "body":"does it work",
    "name":"testuser1",
    "email":"test@test.com",
    "product_id":product_id
  });
  const payloadA = JSON.stringify({
    "body":"body",
    "name": "name",
    "email":"email@e.com",
    "photos":["https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80", "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"]
});

   const response = http.get(`http://18.116.200.106/qa/questions?product_id=${product_id}`, {headers: {Accepts: "application/json"}});
  // const response = http.get(`http://localhost:2600/qa/questions?product_id=${product_id}`, {headers: {Accepts: "application/json"}});
  // const response = http.get(`http://localhost:2600/qa/questions/${answer_id}/answers`, {headers: {Accepts: "application/json"}});
  // const response = http.post(`http://localhost:2600/qa/questions`, payload, {headers: { 'Content-Type': 'application/json' }});
  // const response = http.post(`http://localhost:2600/qa/questions/${question_id}/answers`, payloadA, {headers: { 'Content-Type': 'application/json' }});
  // const response = http.put(`http://localhost:2600/qa/questions/${question_id}/helpful`, {headers: {Accepts: "application/json"}});
  // const response = http.put(`http://localhost:2600/qa/answers/${answer_id}/helpful`, {headers: {Accepts: "application/json"}});


  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}




