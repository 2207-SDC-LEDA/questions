CREATE INDEX p_q
ON product_questions (pid, qid);

CREATE INDEX qindex
ON Questions (id, reported);

CREATE INDEX aindex
ON Answers (id, reported);

CREATE INDEX pindex
ON photos (aid, id);


DROP INDEX p_q
ON product_questions;
DROP INDEX qindex
ON questions;
DROP INDEX aindex
ON answers;
alter table photos drop foreign key photos_ibfk_1;
DROP INDEX pindex
ON photos;
ALTER TABLE `photos` ADD FOREIGN KEY (aid) REFERENCES `Answers` (`id`);