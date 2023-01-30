const router = require('express').Router();
const {routetest, getQuestions, getAnswers, postQuestion, postAnswer, helpfulQ, helpfulA, reportA} = require('./controller');

router.get('/', routetest);
router.get('/qa/questions', getQuestions);
router.get('/qa/questions/:question_id/answers', getAnswers);
router.post('/qa/questions', postQuestion);
router.post('/qa/questions/:question_id/answers', postAnswer);
router.put('/qa/questions/:question_id/helpful', helpfulQ);
router.put('/qa/answers/:answer_id/helpful', helpfulA);
// router.put('/qa/questions/:qid/report', reportQ);
router.put('/qa/answers/:answer_id/report', reportA);


module.exports = router;