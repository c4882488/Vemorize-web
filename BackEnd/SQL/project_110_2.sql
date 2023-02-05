-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-14 15:12:11
-- 伺服器版本： 10.4.22-MariaDB
-- PHP 版本： 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `project_110_2`
--

-- --------------------------------------------------------

--
-- 資料表結構 `class`
--

CREATE TABLE `class` (
  `id` int(20) NOT NULL,
  `class_name` varchar(40) CHARACTER SET utf8 NOT NULL,
  `class_teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `class`
--

INSERT INTO `class` (`id`, `class_name`, `class_teacher_id`) VALUES
(1, '110-1 智商三甲', 1),
(2, '110-1 智商三乙', 1),
(4, '110-1 智商二甲', 1),
(8, 'test class', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `class_student`
--

CREATE TABLE `class_student` (
  `id` int(20) NOT NULL,
  `stuednt_user_id` int(11) NOT NULL,
  `stuednt_class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `class_student`
--

INSERT INTO `class_student` (`id`, `stuednt_user_id`, `stuednt_class_id`) VALUES
(1, 2, 1),
(2, 15, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `quiz`
--

CREATE TABLE `quiz` (
  `id` int(20) NOT NULL,
  `quiz_score` int(20) NOT NULL,
  `quiz_user_id` int(20) NOT NULL,
  `quiz_wordset_id` int(20) NOT NULL,
  `quiz_class_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `quiz`
--

INSERT INTO `quiz` (`id`, `quiz_score`, `quiz_user_id`, `quiz_wordset_id`, `quiz_class_id`) VALUES
(1, 90, 2, 1, 1),
(2, 85, 15, 1, 1),
(3, 80, 2, 2, 1),
(4, 70, 2, 1, 1),
(6, 75, 2, 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `role`
--

CREATE TABLE `role` (
  `id` int(20) NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'teacher'),
(2, 'student');

-- --------------------------------------------------------

--
-- 資料表結構 `test`
--

CREATE TABLE `test` (
  `id` int(10) NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 NOT NULL,
  `role` varchar(40) CHARACTER SET utf8 COLLATE utf8_german2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `test`
--

INSERT INTO `test` (`id`, `name`, `role`) VALUES
(1, 'test1', 'teacher'),
(2, 'test2', 'student'),
(3, 'test3', 'student'),
(4, 'test66666', 'student');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `user_name` varchar(40) CHARACTER SET utf8 NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_password` varchar(40) NOT NULL,
  `user_birthday` date NOT NULL,
  `token` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `user_name`, `user_email`, `user_password`, `user_birthday`, `token`) VALUES
(1, 'Test112', 'Test01@email.com', 'test', '2000-10-10', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmxvZy52aG9zdC5jb20iLCJhdWQiOiJodHRwOi8vYmxvZy52aG9zdC5jb20iLCJpYXQiOjE2NTQ2ODc2NjYsImV4cCI6MTY1NDY4ODI2NiwiZGF0YSI6eyJpZCI6IlRlc3QwMUBlbWFpbC5jb20ifX0.HtC1FPkw8DOkdmJlclrShF-ZJhLu0Whpmq_oiFU_YMs'),
(2, 'Test02', 'Test02@email.com', 'test', '2000-10-11', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmxvZy52aG9zdC5jb20iLCJhdWQiOiJodHRwOi8vYmxvZy52aG9zdC5jb20iLCJpYXQiOjE2NTQ2NTk0MzMsImV4cCI6MTY1NDY2MDAzMywiZGF0YSI6eyJpZCI6IlRlc3QwMkBlbWFpbC5jb20ifX0.rrgUfD7lol0qFEslyXs3q3_DMlCvXG-wh_ExHKZqRDM'),
(15, 'Test06', 'Test06@email.com', 'test', '2000-10-12', NULL),
(16, 'Test07', 'Test07@email.com', 'test', '2000-10-10', NULL),
(17, 'Test08', 'Test08@email.com', 'test', '2000-10-10', NULL);

--
-- 觸發器 `user`
--
DELIMITER $$
CREATE TRIGGER `default_role` AFTER INSERT ON `user` FOR EACH ROW BEGIN
INSERT INTO `user_role` (user_id, role_id)
Values (new.id, 2);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `user_role`
--

CREATE TABLE `user_role` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `role_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(6, 15, 2),
(7, 16, 2),
(8, 17, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `word`
--

CREATE TABLE `word` (
  `id` int(20) NOT NULL,
  `word_english` varchar(40) CHARACTER SET utf8 NOT NULL,
  `word_chinese` varchar(40) CHARACTER SET utf8 NOT NULL,
  `word_meaning` varchar(200) CHARACTER SET utf8 NOT NULL,
  `word_pos` varchar(40) CHARACTER SET utf8 NOT NULL,
  `wordset_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `word`
--

INSERT INTO `word` (`id`, `word_english`, `word_chinese`, `word_meaning`, `word_pos`, `wordset_id`) VALUES
(1, 'apple', '蘋果', 'A round fruit with firm, white flesh and a green, red, or yellow skin.', 'n.', 1),
(2, 'banana', '香蕉', 'A long, curved fruit with a yellow skin and soft, sweet, white flesh inside.', 'n.', 1),
(3, 'candy', '糖果', 'A sweet food made from sugar or chocolate, or a piece of this.', 'n.', 1),
(4, 'How1', '如何', 'in what way, or by what methods', 'v.', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `wordset`
--

CREATE TABLE `wordset` (
  `id` int(20) NOT NULL,
  `wordset_name` varchar(40) CHARACTER SET utf8 NOT NULL,
  `class_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `wordset`
--

INSERT INTO `wordset` (`id`, `wordset_name`, `class_id`) VALUES
(1, 'How的單字小教室', 1),
(2, 'YoYo的單字小教室', 1),
(6, 'Test555的單字小教室', 1),
(9, 'test name', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_teacher_id` (`class_teacher_id`);

--
-- 資料表索引 `class_student`
--
ALTER TABLE `class_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stuednt_class_id` (`stuednt_class_id`),
  ADD KEY `stuednt_user_id` (`stuednt_user_id`);

--
-- 資料表索引 `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_user_id` (`quiz_user_id`),
  ADD KEY `quiz_user_id_2` (`quiz_user_id`),
  ADD KEY `quiz_class_id` (`quiz_class_id`),
  ADD KEY `quiz_wordset_id` (`quiz_wordset_id`);

--
-- 資料表索引 `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- 資料表索引 `word`
--
ALTER TABLE `word`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wordset_id` (`wordset_id`);

--
-- 資料表索引 `wordset`
--
ALTER TABLE `wordset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `class`
--
ALTER TABLE `class`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `class_student`
--
ALTER TABLE `class_student`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `word`
--
ALTER TABLE `word`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `wordset`
--
ALTER TABLE `wordset`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`class_teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `class_student`
--
ALTER TABLE `class_student`
  ADD CONSTRAINT `class_student_ibfk_1` FOREIGN KEY (`stuednt_class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `class_student_ibfk_2` FOREIGN KEY (`stuednt_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`quiz_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`quiz_class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_ibfk_3` FOREIGN KEY (`quiz_wordset_id`) REFERENCES `wordset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_role_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `word`
--
ALTER TABLE `word`
  ADD CONSTRAINT `word_ibfk_1` FOREIGN KEY (`wordset_id`) REFERENCES `wordset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `wordset`
--
ALTER TABLE `wordset`
  ADD CONSTRAINT `wordset_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
