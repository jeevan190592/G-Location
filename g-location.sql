-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 14, 2021 at 01:48 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g-location`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertAndUpdateUsers` (IN `_name` VARCHAR(100), IN `_email` VARCHAR(100), IN `_id` INT)  BEGIN
if _id = 0 THEN
    INSERT INTO users(name, email) VALUES (_name, _email);
    SET _id = LAST_INSERT_ID();
    ELSE
    UPDATE users SET name = _name, email = _email where id = _id;
    END IF;
SELECT _id AS 'ID';
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `title` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `storeID` int(11) NOT NULL,
  `filename` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `weight` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `barcode` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `weight`, `store_id`, `barcode`, `location`, `created`, `updated`, `price`) VALUES
(6, 'abcdefd', 10, 1, 1212, '231s', '2021-03-12 13:20:33', '2021-03-13 20:03:00', 283),
(7, 'c', 1, 1, 1212121, '231', '2021-03-12 13:20:33', '2021-03-13 00:34:26', 3554),
(8, 'dj', 1, 1, 1212121, '231', '2021-03-12 13:20:33', '2021-03-13 14:17:53', 4),
(9, 'asf', 1, 1, 1, 'kjh', '2021-03-12 17:48:32', '2021-03-13 20:57:07', 1),
(10, 'afdlj', 1, 1, 1, 'hjl', '2021-03-12 17:51:45', '2021-03-13 20:57:10', 1),
(11, 'lkadfj', 1, 1, 1, 'ljhdlhj', '2021-03-12 17:54:47', '2021-03-13 20:57:12', 1),
(12, 'venkat', 1, 1, 1, 'ljhdlhj', '2021-03-12 17:54:57', '2021-03-13 20:57:13', 1),
(18, 'one', 1, 1, 1, 'one', '2021-03-12 19:11:41', '2021-03-13 20:57:15', 1),
(20, 'a', 1, 1, 1, 'fg', '2021-03-12 19:12:03', '2021-03-13 20:57:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pincode` int(11) NOT NULL,
  `address` varchar(500) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `phoneno` varchar(20) NOT NULL,
  `facebookURL` varchar(100) NOT NULL,
  `twitterURL` varchar(100) NOT NULL,
  `youtubeURL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `pincode`, `address`, `created`, `updated`, `phoneno`, `facebookURL`, `twitterURL`, `youtubeURL`) VALUES
(1, 'asf', 1, 'New Address', '2021-03-13 09:49:24', '2021-03-13 20:58:23', '1', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `userID` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `storeID` int(11) NOT NULL,
  `role` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `phoneno` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created`, `updated`, `userID`, `name`, `email`, `password`, `storeID`, `role`, `image`, `phoneno`) VALUES
(23, '2021-03-13 11:41:17', '2021-03-14 12:12:46', 'test', 'Test User', '', 'test', 1, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `storeID` (`storeID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`) USING BTREE;

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `storeID` (`storeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`storeID`) REFERENCES `stores` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`storeID`) REFERENCES `stores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
