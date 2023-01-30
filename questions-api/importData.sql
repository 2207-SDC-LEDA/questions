LOAD DATA local INFILE '/Users/rongli/hackreactor/sdc/data/questions.csv' into table questions FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, @dummy, body, date,askername, askeremail, reported, helpfulness) \W;
LOAD DATA local INFILE '/Users/rongli/hackreactor/sdc/data/questions.csv' into table product_questions FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (qid,pid, @dummy,@dummy,@dummy, @dummy, @dummy, @dummy) \W;
LOAD DATA local INFILE '/Users/rongli/hackreactor/sdc/data/answers.csv' into table answers FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, qid, body, date,answerername, answereremail, reported, helpfulness) \W;
LOAD DATA local INFILE '/Users/rongli/hackreactor/sdc/data/answers_photos.csv' into table photos FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, aid, address) \W;

