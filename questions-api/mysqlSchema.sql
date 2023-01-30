DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;
 -- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS `Questions`;

CREATE TABLE `Questions` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(1000) NOT NULL,
  `date` VARCHAR(13) NOT NULL,
  `helpfulness` INTEGER NOT NULL DEFAULT 0,
  `reported` INTEGER NOT NULL DEFAULT 0,
  `askername` VARCHAR(60) NOT NULL,
  `askeremail` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Questionstest` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(1000) NOT NULL,
  `date` VARCHAR(13) NOT NULL,
  `helpfulness` INTEGER NOT NULL DEFAULT 0,
  `reported` INTEGER NOT NULL DEFAULT 0,
  `askername` VARCHAR(60) NOT NULL,
  `askeremail` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

CREATE TABLE `Answers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(1000) NOT NULL,
  `date` VARCHAR(13) NOT NULL,
  `helpfulness` INTEGER NOT NULL DEFAULT 0,
  `reported` INTEGER NOT NULL DEFAULT 0,
  `answerername` VARCHAR(60) NOT NULL,
  `answereremail` VARCHAR(60) NOT NULL,
  `qid` INTEGER(11) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'product_questions'
--
-- ---

DROP TABLE IF EXISTS `product_questions`;

CREATE TABLE `product_questions` (
  `pid` INTEGER NOT NULL,
  `qid` INTEGER(11) NOT NULL,
  PRIMARY KEY (`pid`,`qid`)
);

-- ---
-- Table 'QA'
--
-- ---

-- DROP TABLE IF EXISTS `QA`;

-- CREATE TABLE `QA` (
--   `qid` INTEGER(11) NOT NULL,
--   `aid` INTEGER NOT NULL,
--   PRIMARY KEY (`qid`,`aid`)
-- );

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `address` MEDIUMTEXT NOT NULL,
  `aid` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `photostest` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `address` MEDIUMTEXT NOT NULL,
  `aid` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);
-- ---
-- Foreign Keys
-- ---

ALTER TABLE `product_questions` ADD FOREIGN KEY (qid) REFERENCES `Questions` (`id`);
ALTER TABLE `Answers` ADD FOREIGN KEY (qid) REFERENCES `Questions` (`id`);
-- ALTER TABLE `QA` ADD FOREIGN KEY (qid) REFERENCES `Questions` (`id`);
-- ALTER TABLE `QA` ADD FOREIGN KEY (aid) REFERENCES `Answers` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (aid) REFERENCES `Answers` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `product_questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `QA` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Questions` (`id`,`body`,`date`,`helpfulness`,`reported`,`askername`,`askeremail`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Answers` (`id`,`body`,`date`,`helpfulness`,`reported`,`answerername`,`answereremail`) VALUES
-- ('','','','','','','');
-- INSERT INTO `product_questions` (`pid`,`qid`) VALUES
-- ('','');
-- INSERT INTO `QA` (`qid`,`aid`) VALUES
-- ('','');
-- INSERT INTO `photos` (`id`,`address`,`aid`) VALUES
-- ('','','');