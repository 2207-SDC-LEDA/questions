const {db} = require('./db');

exports.readQ =(id, page, count) =>{

  // let query = `select * from Questions where id in
              // (select qid from product_questions where pid=${id}) and reported = 0`;
  let rangel = count*(page-1);
  let rangeh = rangel + count;
  let query = `select q.id as question_id, q.body as question_body, q.date as question_date,
               q.askername as asker_name, q.helpfulness as question_helpfulness,
               q.reported as reported, a.id as id, a.body as body, a.date as date,
               a.answerername as answerer_name, a.helpfulness as helpfulness,
               p.address as address
               from Questions as q
               left outer join answers as a on q.id = a.qid
               left outer join photos as p on a.id = p.aid
               where q.id in
              (select qid from product_questions where pid=${id}) and q.reported = 0 limit ${rangel}, ${rangeh}`;
  // console.log(query);
  return db.queryAsync(query).catch((error)=>console.log(error));
};

exports.readA =(id, page, count) =>{
  let rangel = count*(page-1);
  let rangeh = rangel + count;
  let query = `select a.id as answer_id, a.body, a.date, a.answerername as answerer_name,
              a.helpfulness, p.id, p.address from Answers as a
              left outer join photos as p on a.id = p.aid
              where a.id in
              (select id from answers where qid=${id})
              and a.reported = 0 limit ${rangel}, ${rangeh}`;
  // let query2=`select * from photos where aid in
            //  (select aid from QA where qid=${id}) and reported = 0)`;
  // console.log(query);
  return db.queryAsync(query).catch((error)=>console.log(error));
};

exports.addQ = (body, name, email, pid) =>{
  // let date = Date.parse("13-Oct-2015 18:31:00")/1000;
  let date = Math.floor(Date.now()/ 1000);
  let query = ` INSERT INTO questions(body, date, askername, askeremail)
    VALUES("${body}", "${date}","${name}","${email}")`;
  return db.queryAsync(query)
    .then((result)=>{
      // return result[0].insertId;
      console.log(result[0].insertId);
      let qid = result[0].insertId;
      let query2=`INSERT INTO product_questions (pid, qid)
           VALUES(${pid}, ${qid})`;
      return db.queryAsync(query2);
    })
    .catch((error)=>console.log(err));
  // return db.queryAsync(query).catch((error)=>console.log(err));
};

exports.addA = (qid, body,name,email,photos) =>{
  let date = Math.floor(Date.now()/ 1000);
  let query = ` INSERT INTO answers(body, date, answerername, answereremail, qid)
    VALUES("${body}", "${date}","${name}","${email}", ${qid})`;
  return db.queryAsync(query)
    .then((result)=>{
      // return result[0].insertId;
      // console.log(result[0].insertId);
      let aid = result[0].insertId;
      let dbArray=[];
      if (photos.length >0) {
        dbArray = photos.map((url)=>{
          console.log(url);
          console.log(`INSERT INTO photos(aid, address)
          VALUES(${aid},"${url}")`);
          return db.queryAsync(`INSERT INTO photos(aid, address)
          VALUES(${aid},"${url}")`).catch((error)=>console.log(error));});
        }


      // console.log(dbArray);
      return dbArray;
      // return db.queryAsync(query2).catch((error)=>console.log(error));
    })
    .catch((error)=>console.log(error));
  // return db.queryAsync(query).catch((error)=>console.log(err));
};

exports.helpfulQ =(qid) =>{
  let query = `update questions set helpfulness=helpfulness+1 where id = ${qid}`;
  return db.queryAsync(query).catch((err)=>{console.log(err)});
};

exports.helpfulA =(aid) =>{
  let query = `update answers set helpfulness=helpfulness+1 where id = ${aid}`;
  return db.queryAsync(query).catch((err)=>{console.log(err)});
};

exports.reportA =(aid) =>{
  let query = `update answers set reported = 1 where id = ${aid}`;
  return db.queryAsync(query).catch((err)=>{console.log(err)});
};