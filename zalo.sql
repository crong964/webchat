-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2024 at 02:51 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zalo`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createday` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account`, `password`, `createday`) VALUES
(' huynhtuanan3119410001@gmail.c', '123', '2023-12-19 16:09:25'),
(' tranphap0407@gmail.com', '123', '2023-12-19 16:09:25'),
('0933388205ductay@gmail.com', '123', '2023-12-19 16:09:25'),
('astrojasairo0@gmail.com ', '123', '2023-12-19 16:09:25'),
('chauquocalin1@gmail.com', '123', '2023-12-19 16:09:25'),
('Chicuong3042001@gmail.com', '123', '2023-12-19 16:09:25'),
('chuongdominh008@gmail.com', '123', '2023-12-19 16:09:25'),
('Dongatdong@gmail.com', '123', '2023-12-19 16:09:25'),
('duccanhole@gmail.com', '123', '2023-12-19 16:09:25'),
('ducdoc512k1@gmail.com ', '123', '2023-12-19 16:09:25'),
('duonggtran2612001@gmail.com', '123', '2023-12-19 16:09:25'),
('duongquyquoc04@gmail.com', '123', '2023-12-19 16:09:25'),
('duykid146@gmail.com', '123', '2023-12-19 16:09:25'),
('hgiangcvl@gmail.com', '123', '2023-12-19 16:09:25'),
('hien3032001@gmail.com', '123', '2023-12-19 16:09:25'),
('hieu01654661521@gmail.com', '123', '2023-12-19 16:09:25'),
('hoangkhanhdragon@gmail.com', '123', '2023-12-19 16:09:25'),
('hodohoangkhang@gmail.com', '123', '2023-12-19 16:09:25'),
('hsluan611@gmail.com', '123', '2023-12-19 16:09:25'),
('huy91027@gmail.com', '123', '2022-12-01 15:28:23'),
('huyhoang191072@gmail.com', '123', '2023-12-19 16:09:25'),
('huyihuy140@gmail.com', '123', '2022-12-20 15:28:23'),
('huyltqsgu@gmail.com', '123', '2023-12-19 16:09:25'),
('huynhcongkhoa21@gmail.com', '123', '2023-12-19 16:09:25'),
('huyphan221122@gmail.com', '123', '2023-12-19 16:09:25'),
('khaibuixuan2@gmail.com', '123', '2023-12-19 16:09:25'),
('khoaanhnguyen02@gmail.com', '123', '2023-12-19 16:09:25'),
('kimphu.tran154@gmail.com', '123', '2023-12-19 16:09:25'),
('lehoangandinh19@gmail.com', '123', '2023-12-19 16:09:25'),
('lequannghia1532@gmail.com', '123', '2023-12-19 16:09:25'),
('lexuanduc147@gmail.com', '123', '2023-12-19 16:09:25'),
('lychihuybtbl2002@gmail.com', '123', '2023-12-19 16:09:25'),
('lyquocan171@gmail.com', '123', '2023-12-19 16:09:25'),
('lytheminh3q@gmail.com', '123', '2023-12-19 16:09:25'),
('manhla64@gmail.com', '123', '2023-12-19 16:09:25'),
('mtd.sgu@gmail.com', '123', '2023-12-19 16:09:25'),
('ndnghiemsgu@gmail.com', '123', '2023-12-19 16:09:25'),
('ngthanhdat31@gmail.com', '123', '2023-12-19 16:09:25'),
('nguyendangyukhoa01@gmail.com', '123', '2023-12-19 16:09:25'),
('nguyenminhtrungvta2001@gmail.c', '123', '2023-12-19 16:09:25'),
('nguyentansang278@gmail.com', '123', '2023-12-19 16:09:25'),
('nhannguyen06092001@gmail.com', '123', '2023-12-19 16:09:25'),
('nhatyassuo2003@gmail.com', '123', '2023-12-19 16:09:25'),
('nhuthienlang@gmail.com', '123', '2023-12-19 16:09:25'),
('nntchinh2001@gmail.com', '123', '2023-12-19 16:09:25'),
('nthnam.a1.c3tqcap@gmail.com', '123', '2023-12-19 16:09:25'),
('phamducduy970@gmail.com', '123', '2023-12-19 16:09:25'),
('phanchidung3107@gmail.com ', '123', '2023-12-19 16:09:25'),
('phongdiepp@gmail.com', '123', '2023-12-19 16:09:25'),
('phuc9213@gmail.com', '123', '2023-12-19 16:09:25'),
('phuclocdh2017@gmail.com ', '123', '2023-12-19 16:09:25'),
('phucn1435@gmail.com', '123', '2023-12-19 16:09:25'),
('quangtranhongquang@gmail.com', '123', '2023-12-19 16:09:25'),
('quoctai1412@gmail.com', '123', '2023-12-19 16:09:25'),
('Steveanh61@gmail.com', '123', '2023-12-19 16:09:25'),
('syphu1995@gmail.com', '123', '2023-12-19 16:09:25'),
('thaibao15102002@gmail.com', '123', '2023-12-19 16:09:25'),
('thienhv2001@gmail.com', '123', '2023-12-19 16:09:25'),
('thienlop12c1@gmail.com', '123', '2023-12-19 16:09:25'),
('tien8a1.bp@gmail.com', '123', '2023-12-19 16:09:25'),
('tompham2901@gmail.com', '123', '2023-12-19 16:09:25'),
('tranchithanh123xz@gmail.com', '123', '2023-12-19 16:09:25'),
('tranhoanganhkhoa.qng@gmail.com', '123', '2023-12-19 16:09:25'),
('tranquangdao2601@gmail.com', '123', '2023-12-19 16:09:25'),
('trantanminh113@gmail.com', '123', '2023-12-19 16:09:25'),
('trunghaufortune@gmail.com', '123', '2023-12-19 16:09:25'),
('trungkien8632@gmail.com', '123', '2023-12-19 16:09:25'),
('tueman.63.got@gmail.com', '123', '2023-12-19 16:09:25'),
('tuyetmai032002@gmail.com', '123', '2023-12-19 16:09:25'),
('vansubmt@gmail.com', '123', '2023-12-19 16:09:25'),
('vominhtri13@gmail.com', '123', '2023-12-19 16:09:25'),
('vothanhhoa705@gmail.com', '123', '2023-12-19 16:09:25'),
('vovanhung2864@gmail.com', '123', '2023-12-19 16:09:25'),
('Vtrong969@gmail.com', '123', '2023-12-19 16:09:25');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `accountAdmin` varchar(100) COLLATE utf32_vietnamese_ci NOT NULL,
  `passwordAdmin` varchar(100) COLLATE utf32_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_vietnamese_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`accountAdmin`, `passwordAdmin`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `boxchat`
--

CREATE TABLE `boxchat` (
  `idBox` int(11) NOT NULL,
  `Ngay` datetime NOT NULL DEFAULT current_timestamp(),
  `content` varchar(100) COLLATE utf8_vietnamese_ci NOT NULL,
  `id` int(11) NOT NULL,
  `boxtype` varchar(2) COLLATE utf8_vietnamese_ci NOT NULL DEFAULT '0',
  `boxiamge` varchar(100) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `updateDay` datetime NOT NULL DEFAULT current_timestamp(),
  `messType` varchar(20) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `boxchat`
--

INSERT INTO `boxchat` (`idBox`, `Ngay`, `content`, `id`, `boxtype`, `boxiamge`, `updateDay`, `messType`) VALUES
(12, '2023-12-14 22:23:32', 'dasdasddddddddddddddddddddd dasdasdasdad dấdasdasd', 26, '0', NULL, '2024-02-21 09:40:59', 'mess'),
(13, '2023-12-30 21:15:43', '', 0, '0', NULL, '2023-12-30 21:15:43', ''),
(14, '2023-12-30 21:28:00', '46', 26, '0', NULL, '2024-02-14 10:53:12', 'mess'),
(19, '2023-12-30 21:33:31', 'dasdasdad', 26, '0', NULL, '2024-02-19 23:52:32', 'mess'),
(22, '2024-01-06 21:57:57', 'đáasdasd', 27, '2', NULL, '2024-02-20 09:46:53', 'mess'),
(23, '2024-02-14 10:34:19', '', 0, '2', NULL, '2024-02-14 10:34:19', '');

-- --------------------------------------------------------

--
-- Table structure for table `havelistboxchat`
--

CREATE TABLE `havelistboxchat` (
  `idUser` int(30) NOT NULL,
  `idBox` int(11) NOT NULL,
  `Ngay` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(2) NOT NULL,
  `idFriend` int(30) NOT NULL,
  `admin` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `havelistboxchat`
--

INSERT INTO `havelistboxchat` (`idUser`, `idBox`, `Ngay`, `status`, `idFriend`, `admin`) VALUES
(26, 12, '2023-12-14 22:23:32', 1, 27, 0),
(26, 13, '2023-12-30 21:15:43', 1, 55, 0),
(26, 14, '2023-12-30 21:28:00', 1, 54, 0),
(26, 19, '2023-12-30 21:33:31', 1, 56, 0),
(26, 22, '2024-02-14 10:39:18', 1, 26, 1),
(26, 23, '2024-02-14 10:54:37', 0, 26, 1),
(27, 12, '2023-12-14 22:23:32', 2, 26, 0),
(27, 22, '2024-02-15 11:19:30', 1, 27, 0),
(27, 23, '2024-02-14 10:34:19', 0, 27, 0),
(54, 14, '2023-12-30 21:28:00', 2, 26, 0),
(54, 22, '2024-01-06 21:57:57', 2, 54, 2),
(54, 23, '2024-02-14 10:34:19', 0, 54, 0),
(55, 13, '2023-12-30 21:15:43', 0, 26, 0),
(55, 22, '2024-01-06 21:57:57', 2, 55, 2),
(55, 23, '2024-02-14 10:34:19', 0, 55, 0),
(56, 19, '2023-12-30 21:33:31', 2, 0, 0),
(56, 22, '2024-01-06 21:57:57', 2, 56, 0),
(56, 23, '2024-02-14 10:34:19', 0, 56, 0);

-- --------------------------------------------------------

--
-- Table structure for table `havelistfriends`
--

CREATE TABLE `havelistfriends` (
  `idUser` int(11) NOT NULL,
  `idFriends` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `havelistfriends`
--

INSERT INTO `havelistfriends` (`idUser`, `idFriends`) VALUES
(26, 27),
(27, 26),
(54, 26),
(26, 54),
(55, 26),
(26, 55),
(56, 26),
(26, 56);

-- --------------------------------------------------------

--
-- Table structure for table `hiddenmesslist`
--

CREATE TABLE `hiddenmesslist` (
  `idUser` int(30) NOT NULL,
  `idMess` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_vietnamese_ci;

--
-- Dumping data for table `hiddenmesslist`
--

INSERT INTO `hiddenmesslist` (`idUser`, `idMess`) VALUES
(26, 104),
(26, 108),
(26, 107),
(26, 106),
(26, 102),
(26, 105),
(26, 95),
(26, 94),
(26, 101),
(26, 93),
(26, 103),
(26, 90),
(26, 109),
(26, 91),
(26, 82),
(26, 60),
(26, 62),
(26, 32),
(26, 31),
(26, 57),
(26, 14);

-- --------------------------------------------------------

--
-- Table structure for table `listaddfriends`
--

CREATE TABLE `listaddfriends` (
  `idUser` int(30) NOT NULL,
  `idAddFriends` int(30) NOT NULL,
  `status` varchar(2) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `listaddfriends`
--

INSERT INTO `listaddfriends` (`idUser`, `idAddFriends`, `status`) VALUES
(55, 26, '1');

-- --------------------------------------------------------

--
-- Table structure for table `messenge`
--

CREATE TABLE `messenge` (
  `idMess` int(11) NOT NULL,
  `idBox` int(11) NOT NULL,
  `content` varchar(400) COLLATE utf8_vietnamese_ci NOT NULL,
  `type` int(2) NOT NULL,
  `idUser` int(30) NOT NULL,
  `ngay` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `messenge`
--

INSERT INTO `messenge` (`idMess`, `idBox`, `content`, `type`, `idUser`, `ngay`) VALUES
(12, 12, 'hello', 0, 27, '2023-12-16 20:39:17'),
(13, 12, 'e', 0, 27, '2023-12-16 20:40:08'),
(14, 12, 'hello', 0, 27, '2023-12-16 20:40:28'),
(15, 12, 'hello', 0, 27, '2023-12-16 20:41:18'),
(18, 12, 'hello', 0, 27, '2023-12-16 20:44:30'),
(19, 12, 'hello', 0, 27, '2023-12-16 20:46:04'),
(20, 12, 'hello', 0, 27, '2023-12-16 20:46:59'),
(21, 12, 'h', 0, 27, '2023-12-16 20:47:07'),
(22, 12, 'he', 0, 27, '2023-12-16 20:48:29'),
(23, 12, 'ssdfsd', 0, 27, '2023-12-16 20:48:40'),
(24, 12, 'h', 0, 27, '2023-12-16 20:49:55'),
(25, 12, 'hello', 0, 27, '2023-12-16 20:50:45'),
(26, 12, 'hel', 0, 27, '2023-12-16 20:51:13'),
(27, 12, 'chào cậu', 0, 27, '2023-12-16 21:35:42'),
(28, 12, 'chào cậu', 0, 27, '2023-12-16 21:42:02'),
(31, 12, 'chào', 0, 26, '2023-12-16 21:50:17'),
(32, 12, 'u chào', 0, 27, '2023-12-16 21:50:44'),
(57, 12, 'hello', 0, 26, '2023-12-25 20:42:26'),
(60, 12, 'dddddddd dd dddddd dddd ddddddddddd dddddd ddddddddd ddddddddd ', 0, 26, '2024-01-13 21:17:48'),
(62, 12, 'dasdas', 0, 26, '2024-01-31 21:41:41'),
(63, 12, 'dasdas', 0, 26, '2024-01-31 21:42:06'),
(64, 12, 'ds das ad ', 0, 26, '2024-01-31 21:42:17'),
(65, 12, 'dasd ', 0, 26, '2024-01-31 21:43:26'),
(66, 12, 'dsad ', 0, 26, '2024-01-31 21:44:36'),
(67, 12, 'dasda', 0, 26, '2024-01-31 21:48:13'),
(68, 12, 'dasda', 0, 26, '2024-01-31 21:49:31'),
(69, 12, 'dasdaasda', 0, 26, '2024-01-31 21:49:54'),
(70, 12, 'das', 0, 26, '2024-01-31 21:50:43'),
(71, 12, 'd', 0, 26, '2024-01-31 21:51:21'),
(72, 12, 'dasd', 0, 26, '2024-01-31 21:52:16'),
(73, 12, 'dasd', 0, 26, '2024-01-31 21:52:48'),
(74, 12, 'dasd', 0, 26, '2024-01-31 21:53:13'),
(75, 12, 'dasd', 0, 26, '2024-01-31 21:53:20'),
(76, 12, 'dasd', 0, 26, '2024-01-31 21:53:43'),
(77, 12, 'dasd', 0, 26, '2024-01-31 21:53:57'),
(78, 12, 'dasd ', 0, 26, '2024-01-31 21:56:30'),
(79, 12, 'chia sẻ vị trí trực tiếp', 2, 27, '2024-02-01 21:29:55'),
(80, 12, 'chia sẻ vị trí trực tiếp', 2, 27, '2024-02-01 21:36:08'),
(81, 12, 'chia sẻ vị trí trực tiếp', 2, 27, '2024-02-01 21:38:18'),
(82, 12, 'chia sẻ vị trí trực tiếp', 2, 27, '2024-02-01 21:49:42'),
(83, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:47:12'),
(84, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:47:17'),
(85, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:47:18'),
(87, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:51:51'),
(88, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:52:43'),
(90, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:53:19'),
(91, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:54:22'),
(92, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:54:49'),
(93, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:55:49'),
(94, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 09:57:45'),
(95, 12, 'hello đá asda đá ', 0, 26, '2024-02-04 09:57:58'),
(96, 12, 'chia sẻ vị trí_106.8849678_10.9079908', 3, 26, '2024-02-04 10:04:24'),
(97, 12, 'chia sẻ vị trí_106.840064_10.9346816', 3, 26, '2024-02-04 10:05:01'),
(98, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-04 10:08:59'),
(99, 12, 'image-1707055143447-962112183.jpeg ', 1, 26, '2024-02-04 20:59:03'),
(100, 12, 'image-1707055191455-338986726.jpeg image-1707055191459-960713387.jpeg image-1707055191461-559972188.jpeg image-1707055191462-298470403.png image-1707055191462-522986445.jpeg ', 1, 26, '2024-02-04 20:59:51'),
(101, 12, 'adas', 0, 26, '2024-02-05 11:40:35'),
(102, 12, 'chia sẻ vị trí_106.840064_10.9477888', 3, 26, '2024-02-05 11:53:58'),
(103, 12, 'chia sẻ vị trí_106.840064_10.9477888', 3, 26, '2024-02-05 11:59:24'),
(104, 12, 'chia sẻ vị trí_106.840064_10.9477888', 3, 26, '2024-02-05 11:59:47'),
(105, 12, 'chia sẻ vị trí_106.840064_10.9477888', 3, 26, '2024-02-05 12:00:01'),
(106, 12, 'chia sẻ vị trí_106.840064_10.9477888', 3, 26, '2024-02-05 12:01:05'),
(107, 12, 'chia sẻ vị trí_106.884924_10.9080382', 3, 26, '2024-02-05 12:02:24'),
(108, 12, 'chia sẻ vị trí trực tiếp', 2, 26, '2024-02-05 12:04:33'),
(109, 12, 'dasdas', 0, 26, '2024-02-09 23:48:18'),
(111, 12, 'huy', 0, 26, '2024-02-12 13:18:21'),
(112, 12, 'chaof', 0, 26, '2024-02-12 13:20:05'),
(113, 12, 'dassadas', 0, 26, '2024-02-12 13:20:17'),
(114, 12, 'dasdadasd', 0, 26, '2024-02-12 13:20:26'),
(115, 12, 'dasdasdsa', 0, 26, '2024-02-12 13:20:41'),
(116, 12, 'dadasdas', 0, 26, '2024-02-12 13:21:10'),
(117, 12, 'dasdadasd', 0, 26, '2024-02-12 13:21:18'),
(118, 12, 'dadasd', 0, 26, '2024-02-12 13:21:35'),
(119, 12, 'chia sẻ vị trí_106.8849098_10.9080388', 3, 26, '2024-02-13 21:08:19'),
(120, 12, 'chia sẻ vị trí_106.884835_10.908312', 3, 27, '2024-02-13 21:13:51'),
(121, 12, 'chia sẻ vị trí_106.884835_10.908312', 3, 27, '2024-02-13 21:14:32'),
(122, 12, 'chia sẻ vị trí_106.884835_10.908312', 3, 27, '2024-02-13 21:15:25'),
(123, 12, 'chia sẻ vị trí_106.884912_10.907557', 3, 27, '2024-02-13 21:17:48'),
(124, 12, 'chia sẻ vị trí_106.884912_10.907557', 3, 27, '2024-02-13 21:18:08'),
(125, 12, 'chia sẻ vị trí_106.884912_10.907557', 3, 27, '2024-02-13 21:18:44'),
(126, 12, 'chia sẻ vị trí_106.884912_10.907557', 3, 27, '2024-02-13 21:19:26'),
(127, 12, 'chia sẻ vị trí_106.884912_10.907557', 3, 27, '2024-02-13 21:20:30'),
(128, 12, 'e84cf5a8-2f81-4517-9bd4-21ca36d77c4c_106.8630016_10.9805568', 3, 26, '2024-02-13 21:40:32'),
(129, 12, '4278e0a7-b8ad-4008-962e-da38ebe497ad_106.8849182_10.9080277', 3, 26, '2024-02-13 21:41:35'),
(130, 12, '22b62838-55fb-4154-8000-1fa8c647b231_106.8849182_10.9080277', 3, 26, '2024-02-13 21:42:44'),
(131, 12, 'đấ', 0, 26, '2024-02-13 22:27:34'),
(132, 12, 'đâsd', 0, 26, '2024-02-13 22:29:44'),
(133, 22, 'dasdasd', 0, 26, '2024-02-13 22:53:40'),
(134, 22, 'dấdad', 0, 26, '2024-02-14 10:17:38'),
(135, 22, 'dấdasdasd', 0, 27, '2024-02-14 10:18:04'),
(136, 22, 'dấdasd', 0, 26, '2024-02-14 10:18:14'),
(137, 12, 'dấd', 0, 26, '2024-02-14 10:26:31'),
(138, 14, '46', 0, 26, '2024-02-14 10:53:12'),
(139, 22, 'asdasdasd sadas', 0, 26, '2024-02-14 20:07:49'),
(140, 12, 'ê', 0, 26, '2024-02-19 20:52:42'),
(141, 12, 'ádadasd', 0, 26, '2024-02-19 20:52:48'),
(142, 12, 'dasdasd', 0, 26, '2024-02-19 21:38:42'),
(143, 12, 'dddd', 0, 26, '2024-02-19 21:38:46'),
(144, 22, 'sadasd', 0, 26, '2024-02-19 21:38:50'),
(145, 12, 'dasdasdas', 0, 27, '2024-02-19 21:39:23'),
(146, 12, 'dadasdas', 0, 27, '2024-02-19 21:39:36'),
(147, 22, 'dasdasd', 0, 26, '2024-02-19 21:40:46'),
(148, 12, 'aaaa', 0, 26, '2024-02-19 21:41:20'),
(149, 12, 'dadasdasdasd', 0, 26, '2024-02-19 21:41:47'),
(150, 22, 'dasdasdasd', 0, 26, '2024-02-19 21:43:06'),
(151, 12, 'helloooooooooooooo', 0, 26, '2024-02-19 21:43:26'),
(152, 22, 'dadasdasdas', 0, 27, '2024-02-19 21:44:52'),
(153, 12, 'dasdasd', 0, 27, '2024-02-19 21:45:42'),
(154, 22, 'dasdad', 0, 27, '2024-02-19 21:45:58'),
(155, 12, 'dasdasda', 0, 27, '2024-02-19 21:47:04'),
(156, 22, 'dasdasda', 0, 27, '2024-02-19 21:47:35'),
(157, 22, 'dasdasd', 0, 27, '2024-02-19 21:47:55'),
(158, 12, 'dasdasdasd', 0, 26, '2024-02-19 21:48:03'),
(159, 12, 'ffffffffffffffffff', 0, 26, '2024-02-19 21:48:08'),
(160, 22, 'asd bbbbbbbbbbbbbbbbbbb', 0, 26, '2024-02-19 21:49:06'),
(161, 22, 'asdasdasdas', 0, 27, '2024-02-19 21:50:30'),
(162, 12, 'ddddddddddddddddddddddddddd', 0, 26, '2024-02-19 21:50:56'),
(163, 22, 'dadadasd', 0, 26, '2024-02-19 21:52:30'),
(164, 12, 'dasdasdasd', 0, 26, '2024-02-19 21:52:43'),
(165, 22, 'nhom', 0, 26, '2024-02-19 21:54:04'),
(166, 12, 'ffasada', 0, 26, '2024-02-19 21:54:26'),
(167, 22, 'dadadasdasdasd', 0, 26, '2024-02-19 21:55:50'),
(168, 12, 'dasdasdasd', 0, 26, '2024-02-19 21:59:45'),
(169, 22, 'dadasdasd', 0, 26, '2024-02-19 22:00:41'),
(170, 12, 'dasdasdasd', 0, 26, '2024-02-19 22:02:43'),
(171, 12, 'dadasdasd', 0, 26, '2024-02-19 22:03:03'),
(172, 22, 'dasdasdasd', 0, 26, '2024-02-19 22:06:40'),
(173, 12, '123132', 0, 26, '2024-02-19 22:07:36'),
(174, 22, 'dadasdas', 0, 26, '2024-02-19 22:10:01'),
(175, 12, 'dasdasdasd', 0, 26, '2024-02-19 22:11:48'),
(176, 22, 'dadasdadas', 0, 26, '2024-02-19 22:15:39'),
(177, 12, 'dadasdasd', 0, 26, '2024-02-19 22:16:52'),
(178, 22, '33333333333333', 0, 26, '2024-02-19 22:17:51'),
(179, 12, 'ddddddddddddddd', 0, 26, '2024-02-19 22:19:23'),
(180, 22, 'dadasdasdas', 0, 26, '2024-02-19 22:20:17'),
(181, 12, 'dasdadasd', 0, 26, '2024-02-19 22:22:20'),
(182, 22, 'dasdasdasd', 0, 26, '2024-02-19 22:23:46'),
(183, 12, 'dadasdasd', 0, 26, '2024-02-19 22:27:03'),
(184, 22, 'dasdasdasd', 0, 26, '2024-02-19 22:29:41'),
(185, 22, 'dasdasda', 0, 26, '2024-02-19 22:37:19'),
(186, 12, 'dasdasdad', 0, 26, '2024-02-19 22:38:34'),
(187, 22, 'dadasdasdas', 0, 26, '2024-02-19 22:39:02'),
(188, 12, 'dasdasdasd', 0, 26, '2024-02-19 22:43:49'),
(189, 22, 'dadasdasdad', 0, 26, '2024-02-19 22:44:36'),
(190, 12, 'dasdasdasd', 0, 26, '2024-02-19 22:51:40'),
(191, 22, 'dadadasdas', 0, 26, '2024-02-19 22:52:46'),
(192, 12, 'dddddddddddd', 0, 26, '2024-02-19 22:53:08'),
(193, 12, 'dadasd', 0, 26, '2024-02-19 23:03:41'),
(194, 22, 'dadads', 0, 26, '2024-02-19 23:03:52'),
(195, 12, 'dasdasdas', 0, 26, '2024-02-19 23:04:10'),
(196, 22, 'dasdasdasd', 0, 26, '2024-02-19 23:04:30'),
(197, 12, 'dddddddddddddddd', 0, 26, '2024-02-19 23:04:45'),
(198, 22, 'dasadasdasdasddadasd', 0, 26, '2024-02-19 23:04:59'),
(199, 12, 'ddddddddddddddddddddd', 0, 26, '2024-02-19 23:05:20'),
(200, 22, 'dasdads', 0, 26, '2024-02-19 23:08:37'),
(201, 12, 'dadasd', 0, 26, '2024-02-19 23:14:24'),
(202, 22, 'dadasdasd', 0, 26, '2024-02-19 23:15:12'),
(203, 12, 'dasdasd', 0, 26, '2024-02-19 23:26:38'),
(204, 22, 'dddddddd', 0, 26, '2024-02-19 23:27:46'),
(205, 12, 'dadasdasd', 0, 26, '2024-02-19 23:35:00'),
(206, 22, 'dddddddddd', 0, 26, '2024-02-19 23:35:56'),
(207, 12, 'dasdasda', 0, 26, '2024-02-19 23:46:28'),
(208, 22, 'dasdasd', 0, 26, '2024-02-19 23:46:53'),
(209, 12, 'dasdasd', 0, 26, '2024-02-19 23:48:41'),
(210, 12, 'dasdadad', 0, 26, '2024-02-19 23:48:55'),
(211, 12, 'dasdasda', 0, 26, '2024-02-19 23:49:01'),
(212, 22, 'asdasdad', 0, 26, '2024-02-19 23:49:10'),
(213, 22, 'dadadasdas', 0, 26, '2024-02-19 23:49:34'),
(214, 22, 'dasdasd', 0, 26, '2024-02-19 23:49:43'),
(215, 12, 'dasdasd', 0, 26, '2024-02-19 23:51:55'),
(216, 19, 'dasdasdad', 0, 26, '2024-02-19 23:52:32'),
(217, 22, 'dasasdasd', 0, 26, '2024-02-19 23:52:38'),
(218, 12, 'dasdasdas', 0, 26, '2024-02-20 09:30:24'),
(219, 22, 'đâsda', 0, 27, '2024-02-20 09:38:28'),
(220, 12, 'đâsd', 0, 27, '2024-02-20 09:39:02'),
(221, 22, 'đâsdasd', 0, 26, '2024-02-20 09:39:53'),
(222, 12, 'đâsdasda', 0, 26, '2024-02-20 09:41:59'),
(223, 22, 'đâsdad', 0, 27, '2024-02-20 09:43:13'),
(224, 12, 'dsdadasdas', 0, 27, '2024-02-20 09:44:18'),
(225, 22, 'dâsda', 0, 27, '2024-02-20 09:45:51'),
(226, 12, 'dấdasd', 0, 27, '2024-02-20 09:46:04'),
(227, 22, 'dsadsadasd', 0, 27, '2024-02-20 09:46:17'),
(228, 12, 'đâsdasdasd', 0, 27, '2024-02-20 09:46:29'),
(229, 22, 'đáasdasd', 0, 27, '2024-02-20 09:46:53'),
(230, 12, 'đâsd', 0, 26, '2024-02-21 09:37:32'),
(231, 12, 'image-1708483063556-916845409.jpeg image-1708483063559-191026047.jpeg image-1708483063561-897825151.jpeg image-1708483063562-899843121.png image-1708483063562-912040939.jpeg image-1708483063562-558629096.jpeg ', 1, 26, '2024-02-21 09:37:43'),
(232, 12, 'dasdasddddddddddddddddddddd dasdasdasdad dấdasdasd', 0, 26, '2024-02-21 09:40:59');

-- --------------------------------------------------------

--
-- Table structure for table `temporaryuser`
--

CREATE TABLE `temporaryuser` (
  `user` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL,
  `nameUser` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL,
  `birthday` date NOT NULL,
  `sex` int(1) NOT NULL,
  `validateCode` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(30) NOT NULL,
  `account` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `nameUser` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `avatar` varchar(200) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `sex` int(1) NOT NULL,
  `alias` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `account`, `nameUser`, `avatar`, `birthday`, `sex`, `alias`) VALUES
(26, 'huyihuy140@gmail.com', 'kai hang', 'https://yt3.ggpht.com/EkVoaVZHZczMS4hz6NFPI1xdzmdFwh9PT8canS92TvtmZp3tHUEdNVem55RQIeFQsYUlextLzw=s88-c-k-c0x00ffffff-no-rj', '0000-00-00', 0, 'huy2'),
(27, 'huy91027@gmail.com', 'huy', 'http://localhost:666/public/avatar/h.jpg', '0000-00-00', 0, 'huy'),
(54, 'syphu1995@gmail.com', 'Nguyễn Văn Sỹ Phú', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560073'),
(55, 'vovanhung2864@gmail.com', 'Võ Văn Hùng', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560031'),
(56, 'nguyendangyukhoa01@gmail.com', 'Nguyễn Đăng Khoa', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560044'),
(57, 'manhla64@gmail.com', 'Lã Trần Minh Anh ', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410028'),
(58, 'Steveanh61@gmail.com', 'Phan Anh', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410037'),
(59, 'chauquocalin1@gmail.com', 'Châu Quốc Alin', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410017'),
(60, 'astrojasairo0@gmail.com ', 'Huỳnh Bá Vương', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560107'),
(61, 'duonggtran2612001@gmail.com', 'Trần Đại Dương', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410078'),
(62, 'thaibao15102002@gmail.com', 'Thái Bảo', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410052'),
(63, 'tranquangdao2601@gmail.com', 'Trần Quang Đạo', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410082'),
(64, 'lychihuybtbl2002@gmail.com', 'Lý Chí Huy', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410206'),
(65, 'huyphan221122@gmail.com', 'Phan Ngọc Huy', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410211'),
(66, 'duongquyquoc04@gmail.com', 'Dương Quý Quốc', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410338'),
(67, 'lytheminh3q@gmail.com', 'Lý Thế Minh', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410251'),
(68, 'phuclocdh2017@gmail.com ', 'Lê Nguyễn Phúc Lộc', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560054'),
(69, 'khoaanhnguyen02@gmail.com', 'Nguyễn Anh Khoa', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560043'),
(70, '0933388205ductay@gmail.com', 'Nguyễn Đức Tây', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121410038'),
(71, 'hieu01654661521@gmail.com', 'Ngô Minh Hiếu', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560026'),
(72, 'phamducduy970@gmail.com', 'Ph���m Đức Duy', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410073'),
(73, 'tranhoanganhkhoa.qng@gmail.com', 'Trần Hoàng Anh Khoa', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3210560046'),
(74, 'hien3032001@gmail.com', 'Nguyễn Kim Hiền', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410122'),
(75, 'tompham2901@gmail.com', 'Phạm Ngọc Đông', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410094'),
(76, ' huynhtuanan3119410001@gmail.c', 'Huỳnh Tuấn An', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410001'),
(77, 'thienhv2001@gmail.com', 'Phùng Minh Thiện', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '31194101412'),
(78, 'vansubmt@gmail.com', 'Nguyễn Văn Sự', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410358'),
(79, 'phongdiepp@gmail.com', 'Diệp Bảo Thanh Phong', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410304'),
(80, 'lyquocan171@gmail.com', 'Lý Quốc An', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410002'),
(81, 'huyltqsgu@gmail.com', 'Lưu Trần Quang Huy', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410154'),
(82, 'ndnghiemsgu@gmail.com', 'Nguyễn Duy Nghiêm', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410274'),
(83, 'hsluan611@gmail.com', 'Hồ Sỹ Luân', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410239'),
(84, 'hoangkhanhdragon@gmail.com', 'Ngô Trịnh Hoàng Khánh', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410186'),
(85, 'trungkien8632@gmail.com', 'Nguyễn Trung Kiên', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410205'),
(86, 'khaibuixuan2@gmail.com', 'Bùi Xuân Khải', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410176'),
(87, 'huynhcongkhoa21@gmail.com', 'Huỳnh Công Khoa', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410190'),
(88, 'tueman.63.got@gmail.com', 'Tô Tuệ Mẫn', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410250'),
(89, 'tuyetmai032002@gmail.com', 'Huỳnh Tuyết Mai', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560058'),
(90, 'lehoangandinh19@gmail.com', 'Lê Hoàng An Đình', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3118410081'),
(91, 'nguyenminhtrungvta2001@gmail.c', 'Nguyễn Minh Trung', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410468'),
(92, 'ducdoc512k1@gmail.com ', 'Nguyễn Hữu Đức ', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410097'),
(93, 'vominhtri13@gmail.com', 'Võ Minh Trí', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121560004'),
(94, 'thienlop12c1@gmail.com', ' Nguyễn Chí Thiện ', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410492'),
(95, 'Chicuong3042001@gmail.com', 'Trần Chí Cường', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560007'),
(96, 'ngthanhdat31@gmail.com', 'Ngô Thành Đạt', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560017'),
(97, 'huyhoang191072@gmail.com', 'Vương Huy Hoàng', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121560034'),
(98, 'kimphu.tran154@gmail.com', 'Trần Kim Phú', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121560071'),
(99, 'nhannguyen06092001@gmail.com', 'Nguyễn Trọng Nhân', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119560048'),
(100, 'nhatyassuo2003@gmail.com', 'Kim Hỷ Nhật', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121410363'),
(101, 'hgiangcvl@gmail.com', 'Nguyễn Hoàng Giang', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3118412016'),
(102, 'nntchinh2001@gmail.com', ' Nguyễn Ngọc Trường Chinh', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410046'),
(103, 'hodohoangkhang@gmail.com', 'Hồ Đỗ Hoàng Khang', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121560044'),
(104, ' tranphap0407@gmail.com', 'Trần Anh Pháp', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121560065'),
(105, 'nthnam.a1.c3tqcap@gmail.com', 'Nguyễn Trương Hoài Nam', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121560058'),
(106, 'nguyentansang278@gmail.com', 'Nguyễn Trọng Tấn Sang', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121560076'),
(107, 'Dongatdong@gmail.com', 'Ngô Phước Đông ', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560020'),
(108, 'phucn1435@gmail.com', 'Nguyễn Hoài Phúc', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560075'),
(109, 'vothanhhoa705@gmail.com', 'Võ Thanh Hòa ', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560029'),
(110, 'quoctai1412@gmail.com', 'Nguyễn Quốc Tài', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560085'),
(111, 'phanchidung3107@gmail.com ', 'Cóong Phan Chí Dũng', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560011'),
(112, 'mtd.sgu@gmail.com', 'Mai Thành Đạt', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3121410143'),
(113, 'chuongdominh008@gmail.com', 'Chương Do Minh', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560060'),
(114, 'Vtrong969@gmail.com', 'Võ Đức Trọng', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560099'),
(115, 'tien8a1.bp@gmail.com', 'Vũ Đức Tân Tiến', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410432'),
(116, 'duykid146@gmail.com', 'Đỗ Thanh Duy', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410085'),
(117, 'tranchithanh123xz@gmail.com', 'Trần Chí Thành', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3117410233'),
(118, 'duccanhole@gmail.com', 'Nguyễn Cảnh Đức', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410139'),
(119, 'phuc9213@gmail.com', 'Nguyễn Châu Toàn Hữu Phúc', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560074'),
(120, 'lexuanduc147@gmail.com', 'Lê Xuân Đức', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410138'),
(121, 'quangtranhongquang@gmail.com', 'Trần Hồng Quang', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120560079'),
(122, 'nhuthienlang@gmail.com', 'Hồ Hải Hậu', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410119'),
(123, 'trunghaufortune@gmail.com', 'Trần Trung Hậu', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3120410161'),
(124, 'lequannghia1532@gmail.com', 'Lê Quan Nghĩa ', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410270'),
(125, 'trantanminh113@gmail.com', 'Trần Tân Minh', 'http://localhost:666/public/avatar/f.png', '2001-01-31', 1, '3119410253');

-- --------------------------------------------------------

--
-- Table structure for table `validateuser`
--

CREATE TABLE `validateuser` (
  `id` int(11) NOT NULL,
  `cookie` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `socket` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `status` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `validateuser`
--

INSERT INTO `validateuser` (`id`, `cookie`, `socket`, `status`) VALUES
(27, '17HcnpmjhHTKDJgKwaUsZ2FT45zB8-XFMA', '', 0),
(27, 'sgZBBw0NgcFrxsPPtdUAg9eQEAheCgFkxg', '', 0),
(26, 'Y3DEVbKD2fy6LQOG60-H4mQ53Hshq7lW1A', '', 0),
(26, 'Zn926OdfkRJ5I1KT47PzWXixj3fMT_e6Vw', '', 0),
(26, 'ugAtvyxqumvnj3V0IkUq7xkxGIeVzmHdAQ', '', 0),
(26, 'SJaX2A8cZzkxlcKu-gh78QNvRJud67cxjg', '', 0),
(26, 'VcEtglLLF4_jLuCurkWy7xldZDux5Lk1xg', '', 0),
(27, 'HteqCNbMxwCFvL6lLq-YjJmiQqOpbGMxzA', '', 0),
(26, 'cJJBgmlTqGlgkdXP3yhYjqpIcMHtz4LMQQ', '', 0),
(27, '1ziwlmGLMbK15oaMJycOqS8TEmXW2I7Hhg', '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account`);

--
-- Indexes for table `boxchat`
--
ALTER TABLE `boxchat`
  ADD PRIMARY KEY (`idBox`);

--
-- Indexes for table `havelistboxchat`
--
ALTER TABLE `havelistboxchat`
  ADD UNIQUE KEY `idUser_idBox` (`idUser`,`idBox`),
  ADD KEY `idBox` (`idBox`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `havelistfriends`
--
ALTER TABLE `havelistfriends`
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idFriends` (`idFriends`);

--
-- Indexes for table `hiddenmesslist`
--
ALTER TABLE `hiddenmesslist`
  ADD KEY `user` (`idUser`);

--
-- Indexes for table `listaddfriends`
--
ALTER TABLE `listaddfriends`
  ADD KEY `idAddFriends` (`idAddFriends`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `messenge`
--
ALTER TABLE `messenge`
  ADD PRIMARY KEY (`idMess`),
  ADD KEY `idBox` (`idBox`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account` (`account`);

--
-- Indexes for table `validateuser`
--
ALTER TABLE `validateuser`
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boxchat`
--
ALTER TABLE `boxchat`
  MODIFY `idBox` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `messenge`
--
ALTER TABLE `messenge`
  MODIFY `idMess` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `havelistboxchat`
--
ALTER TABLE `havelistboxchat`
  ADD CONSTRAINT `havelistboxchat_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `boxchat` (`idBox`),
  ADD CONSTRAINT `havelistboxchat_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `havelistfriends`
--
ALTER TABLE `havelistfriends`
  ADD CONSTRAINT `havelistfriends_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `havelistfriends_ibfk_2` FOREIGN KEY (`idFriends`) REFERENCES `user` (`id`);

--
-- Constraints for table `listaddfriends`
--
ALTER TABLE `listaddfriends`
  ADD CONSTRAINT `listaddfriends_ibfk_1` FOREIGN KEY (`idAddFriends`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `listaddfriends_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `messenge`
--
ALTER TABLE `messenge`
  ADD CONSTRAINT `messenge_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `boxchat` (`idBox`),
  ADD CONSTRAINT `messenge_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `validateuser`
--
ALTER TABLE `validateuser`
  ADD CONSTRAINT `validateuser_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
