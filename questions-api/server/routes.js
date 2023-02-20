const router = require('express').Router();
const {routetest, getQuestions, getAnswers, postQuestion, postAnswer, helpfulQ, helpfulA, reportA} = require('./controller');

router.get('/loaderio-ad5d1d407e7504a7b0732c822f4a0af1.txt', (req, res) => {
  res.status(200).download('./loaderio-ad5d1d407e7504a7b0732c822f4a0af1.txt')
});
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