const models = require('./models.js');

const routetest=(req,res)=>{
  res.send("API service up");
}

const getQuestions = (req, res) =>{
  // console.log('parameter', req.query);
  let pid = req.query.product_id;
  let page = req.query.page || 1;
  let count= req.query.count || 5;
  models.readQ(pid,page,count)
    .then((result)=>{

      let sendback = {};
      sendback['product_id'] = pid;
      sendback['results']=result[0];

      let questions = sendback['results'];
      let qids = [];
      let aids = [];
      let questionArray = [];
      for (let i=0; i< questions.length; i++){
        if(qids.indexOf(questions[i].question_id)<0) {
          // console.log('qid not in qids', questions[i].question_id);
          let question ={};
          question.question_id = questions[i].question_id;
          question.question_body=questions[i].question_body;
          let dt = new Date(parseInt(questions[i].question_date)).toISOString().substr(0, 10);
          question.question_date =dt + "T00:00:00.000Z";
          question.asker_name=questions[i].asker_name;
          question.question_helpfulness = questions[i].question_helpfulness;
          if (questions[i].reported ===0){
            question.reported = false;
          } else {
            question.reported = true;
          }

          question.answers ={};
          let aid = questions[i].id;
          if(aid){
            aid = aid.toString();

            if(aids.indexOf(aid)<0){
              question.answers[aid] = {};
              question.answers[aid].id = parseInt(aid);

              question.answers[aid].body = questions[i].body;
              let dt = new Date(parseInt(questions[i].date)).toISOString().substr(0, 10);
              question.answers[aid].date=dt + "T00:00:00.000Z";
              question.answers[aid].answerer_name = questions[i].answerer_name;
              question.answers[aid].helpfulness = questions[i].helpfulness;
              question.answers[aid].photos = [];
              if (questions[i].address){
                question.answers[aid].photos.push(questions[i].address);
              }
              // console.log('qeustion in qid/aid not existed', question.answers[aid].photos);
              aids.push(aid);
              } else {
              if (questions[i].address){
                question.answers[aid].photos.push(questions[i].address);
              }
              // console.log('after', question.answers[aid].photos);

              }
            questionArray.push(question);

          } else {
            questionArray.push(question);
          }


          qids.push(questions[i].question_id);

          // console.log('questions array', questionArray);

        } else{
            // console.log('qid',questions[i].question_id);
           let question = questionArray[questionArray.length-1];

            let aid = questions[i].id;
            if(aid){
              aid = aid.toString();

              if(aids.indexOf(aid)<0){
                // console.log('aid', aid);
                // console.log('aids', aids);
                // console.log('aid not in array');
                question.answers[aid] = {};
                question.answers[aid].id = parseInt(aid);

                question.answers[aid].body = questions[i].body;
                let dt = new Date(parseInt(questions[i].date)).toISOString().substr(0, 10);
                question.answers[aid].date=dt + "T00:00:00.000Z";
                question.answers[aid].answerer_name = questions[i].answerer_name;
                question.answers[aid].helpfulness = questions[i].helpfulness;
                question.answers[aid].photos = [];

                if (questions[i].address){
                  question.answers[aid].photos.push(questions[i].address);
                }

                aids.push(aid);
                } else {
                if (questions[i].address){
                  // console.log('question in qid/aid already exisited', question);
                  question.answers[aid].photos.push(questions[i].address);
                }
                // console.log('after', question.answers[aid].photos);

                }

            };
            questionArray[questionArray.length-1]=question;

        }


      }

    //  console.log(questionArray);
     sendback['results']= questionArray;
    //  res.send(questionArray);
      res.send(sendback);
    })
    .catch((error)=>{
      throw error;
    });

};

const getAnswers =(req, res) =>{
  let qid=req.params.question_id;
  let page = req.query.page || 1;
  let count= req.query.count || 5;
  models.readA(qid, page, count)
    .then((result)=>{
      let aphotos = result[0].reduce(function (r, a) {
        r[a.answer_id] = r[a.answer_id] || [];
        let photoObj = {};
        photoObj["id"] = a.id;
        photoObj["url"] = a.address;
        r[a.answer_id].push(photoObj);
        return r;
    }, Object.create(null));

    let keys = [];
    let answers = [];
    for (let key in aphotos) {

      for (let i=0; i< result[0].length; i++ ) {

        let id = result[0][i].answer_id.toString();

        if(keys.indexOf(id)<0) {
          let answer = {};

          answer.answer_id = result[0][i].answer_id;
          answer.body = result[0][i].body;
          let dt = new Date(parseInt(result[0][i].date)).toISOString().substr(0, 10);

          answer.date =dt + "T00:00:00.000Z";
          answer.answerer_name = result[0][i].answerer_name;
          answer.helpfulness= result[0][i].helpfulness;
          answer.photos = aphotos[key];

          keys.push(id);
          answers.push(answer);
        }
      }
    }
      let resa = {};
      resa.question = qid;
      resa.results = answers;
      res.send(resa);
    })
    .catch((err)=>{throw err})
};

const postQuestion = (req, res)=>{
  // console.log(req.body);
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let productId = req.body.product_id;

  // console.log(models.addQ(body,name,email,productId));

  models.addQ(body,name,email,productId)
    .then((result)=>{
      //  console.log('result', result);
      // res.send("entry added");
      res.send("Created");
    })
    .catch((err)=>{
      // console.log(err);
      throw err;
    });

};

const postAnswer = (req, res) =>{
  let qid = req.params.question_id;
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let photos = req.body.photos;

  // console.log(models.addQ(body,name,email,productId));

  models.addA(qid, body,name,email,photos)
    .then((result)=>{
      //  console.log('result', result);
      res.send("Created");
    })
    .catch((err)=>{throw err});
};

const helpfulQ = (req, res) =>{
  let qid = req.params.question_id;

  models.helpfulQ(qid)
    .then((result)=>{
      //  console.log('helpful updated', qid);
      res.send("helpful updated");
    })
    .catch((err)=>{throw err});

}


const helpfulA = (req, res) =>{
  let aid = req.params.answer_id;
  models.helpfulA(aid)
    .then((result)=>{
      res.send("helpful updated");
    })
    .catch((err)=>{throw err});

};

const reportA = (req, res) =>{
  let aid = req.params.answer_id;
  models.reportA(aid)
    .then((result)=>{
      res.send("reported");
    })
    .catch((err)=>{throw err});

}



module.exports = {routetest, getQuestions, getAnswers, postQuestion,postAnswer, helpfulQ, helpfulA, reportA};