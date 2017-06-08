-- phpMyAdmin SQL Dump
-- version 4.6.4deb1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-06-2017 a las 21:01:17
-- Versión del servidor: 5.7.18-0ubuntu0.16.10.1
-- Versión de PHP: 7.0.15-0ubuntu0.16.10.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `goTeam`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DEPORTE`
--

CREATE TABLE `DEPORTE` (
  `CodDep` int(11) NOT NULL,
  `NomDep` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `DEPORTE`
--

INSERT INTO `DEPORTE` (`CodDep`, `NomDep`) VALUES
(1, 'Football'),
(2, 'Baloncesto'),
(3, 'Tenis'),
(4, 'Paddle'),
(5, 'Volleyball'),
(6, 'Rugby'),
(7, 'Running'),
(8, 'Baseball'),
(9, 'Ciclismo'),
(10, 'Golf'),
(11, 'Hockey Hielo'),
(12, 'Hockey Césped'),
(13, 'Hockey Patines'),
(14, 'Paintball'),
(15, 'Squash'),
(16, 'Surf'),
(17, 'Senderismo'),
(18, 'Softball'),
(19, 'Waterpolo'),
(20, 'Balonmano'),
(21, 'Football Sala');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EVENTO`
--

CREATE TABLE `EVENTO` (
  `CodEven` int(11) NOT NULL,
  `CodPista` int(11) NOT NULL,
  `FechEven` date NOT NULL,
  `HoraEven` time NOT NULL,
  `NivelEven` varchar(15) NOT NULL DEFAULT 'Principante',
  `UsuariosFaltantes` int(11) NOT NULL,
  `Cerrado` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `EVENTO`
--

INSERT INTO `EVENTO` (`CodEven`, `CodPista`, `FechEven`, `HoraEven`, `NivelEven`, `UsuariosFaltantes`, `Cerrado`) VALUES
(2, 2, '2017-01-23', '17:00:00', 'Principiante', 0, 0),
(3, 41, '2017-01-10', '16:00:00', 'Alto', 0, 0),
(4, 42, '2017-02-11', '15:00:00', 'Medio', 1, 0),
(5, 57, '2017-01-22', '14:00:00', 'Alto', 3, 0),
(6, 50, '2017-01-05', '13:00:00', 'Medio', 2, 0),
(7, 51, '2017-01-02', '12:00:00', 'Alto', 2, 0),
(8, 79, '2017-02-03', '11:00:00', 'Profesional', 1, 0),
(9, 52, '2016-12-23', '10:00:00', 'Principiante', 3, 0),
(10, 60, '2016-12-22', '18:00:00', 'Principiante', 1, 0),
(11, 61, '2016-12-21', '19:00:00', 'Medio', 2, 0),
(12, 64, '2016-12-20', '20:00:00', 'Principiante', 4, 0),
(13, 75, '2016-12-19', '21:00:00', 'Alto', 3, 0),
(14, 76, '2016-12-18', '22:00:00', 'Medio', 4, 0),
(15, 77, '2016-12-17', '14:00:00', 'Principiante', 2, 0),
(16, 78, '2016-12-16', '18:00:00', 'Alto', 4, 0),
(17, 53, '2016-12-15', '19:00:00', 'Principiante', 1, 0),
(18, 47, '2017-05-23', '17:00:00', 'Principiante', 4, 0),
(20, 2, '2017-01-23', '17:00:00', 'Profesional', 2, 0),
(21, 45, '2017-01-23', '17:00:00', 'Principiante', 2, 0),
(22, 2, '2017-01-22', '17:00:00', 'Medio', 3, 0),
(23, 44, '2017-05-23', '18:00:00', 'principiante', 3, 0),
(24, 73, '2017-01-23', '17:00:00', 'principiante', 2, 0),
(25, 67, '2017-01-23', '17:00:00', 'Medio', 2, 0),
(26, 65, '2017-05-23', '15:00:00', 'Medio', 2, 0),
(27, 79, '2017-01-05', '15:00:00', 'Principiante', 7, 0),
(28, 80, '2017-01-05', '16:00:00', 'Medio', 6, 0),
(29, 81, '2017-01-11', '12:00:00', 'Principante', 5, 0),
(30, 82, '2016-12-28', '12:00:00', 'Principante', 8, 0),
(31, 79, '2017-01-10', '13:00:00', 'Bajo', 2, 0),
(32, 75, '2017-05-30', '00:00:00', 'Medio', 2, 0),
(33, 55, '2017-05-31', '18:30:00', 'Alto', 5, 0),
(34, 45, '2017-05-30', '14:00:00', 'Medio', 3, 0),
(35, 43, '2017-05-30', '14:00:00', 'Bajo', 3, 0),
(36, 56, '2017-05-30', '15:30:00', 'Medio', 3, 0),
(37, 57, '2017-05-29', '14:00:00', 'Bajo', 3, 0),
(38, 56, '2017-05-31', '11:30:00', 'Bajo', 3, 0),
(39, 42, '2017-05-31', '11:00:00', 'Bajo', 2, 0),
(40, 69, '2017-05-30', '10:00:00', 'Bajo', 5, 0),
(41, 56, '2017-05-30', '11:30:00', 'Bajo', 2, 0),
(42, 70, '2017-05-31', '10:30:00', 'Bajo', 3, 0),
(43, 56, '2017-05-31', '10:30:00', 'Principiante', 3, 0),
(44, 55, '2017-05-30', '11:00:00', 'Bajo', 3, 0),
(45, 72, '2017-05-30', '10:30:00', 'Bajo', 2, 0),
(46, 55, '2017-05-31', '10:30:00', 'Principiante', 1, 0),
(47, 71, '2017-05-31', '10:30:00', 'Alto', 3, 0),
(48, 59, '2017-06-03', '10:30:00', 'Bajo', 2, 0),
(49, 76, '2017-05-31', '12:00:00', 'Principiante', 3, 0),
(50, 54, '2017-05-31', '10:00:00', 'Principiante', 3, 0),
(51, 71, '2017-05-31', '11:30:00', 'Medio', 3, 0),
(52, 56, '2017-05-31', '11:00:00', 'Principiante', 4, 0),
(53, 72, '2017-05-31', '12:30:00', 'Bajo', 3, 0),
(54, 42, '2017-05-31', '11:00:00', 'Bajo', 3, 0),
(55, 72, '2017-05-31', '11:00:00', 'Bajo', 3, 0),
(56, 55, '2017-05-31', '10:30:00', 'Principiante', 3, 0),
(57, 58, '2017-05-31', '11:00:00', 'Bajo', 2, 0),
(58, 42, '2017-05-31', '11:00:00', 'Principiante', 2, 0),
(59, 71, '2017-05-31', '11:00:00', 'Bajo', 3, 0),
(60, 72, '2017-05-31', '11:00:00', 'Bajo', 4, 0),
(61, 41, '2017-05-30', '11:00:00', 'Bajo', 3, 0),
(62, 66, '2017-05-30', '11:30:00', 'Medio', 3, 0),
(63, 55, '2017-05-29', '11:00:00', 'Bajo', 3, 0),
(64, 2, '2017-05-31', '11:30:00', 'Principiante', 3, 0),
(65, 58, '2017-05-30', '11:00:00', 'Bajo', 3, 0),
(66, 56, '2017-06-16', '11:00:00', 'Principiante', 5, 0),
(67, 57, '2017-05-31', '11:00:00', 'Bajo', 3, 0),
(68, 56, '2017-05-31', '11:00:00', 'Bajo', 4, 0),
(69, 49, '2017-05-31', '11:30:00', 'Medio', 5, 0),
(70, 59, '2017-05-31', '11:00:00', 'Bajo', 5, 0),
(71, 59, '2017-05-31', '12:00:00', 'Medio', 5, 0),
(72, 70, '2017-05-31', '11:00:00', 'Principiante', 6, 0),
(73, 58, '2017-05-31', '12:30:00', 'Principiante', 5, 0),
(74, 73, '2017-05-31', '11:00:00', 'Bajo', 4, 0),
(75, 56, '2017-05-31', '11:00:00', 'Principiante', 3, 0),
(76, 55, '2017-05-31', '11:00:00', 'Bajo', 3, 0),
(77, 41, '2017-05-31', '10:30:00', 'Principiante', 4, 0),
(78, 55, '2017-05-31', '11:00:00', 'Bajo', 4, 0),
(79, 42, '2017-05-31', '10:30:00', 'Bajo', 4, 0),
(80, 73, '2017-05-31', '10:30:00', 'Bajo', 4, 0),
(81, 57, '2017-05-31', '11:00:00', 'Bajo', 3, 0),
(82, 42, '2017-05-30', '12:00:00', 'Bajo', 5, 0),
(83, 41, '2017-05-31', '10:30:00', 'Bajo', 3, 0),
(84, 55, '2017-05-30', '10:30:00', 'Bajo', 3, 0),
(85, 73, '2017-05-31', '11:00:00', 'Bajo', 3, 0),
(86, 59, '2017-05-31', '11:30:00', 'Medio', 2, 0),
(87, 55, '2017-06-17', '11:00:00', 'Bajo', 1, 0),
(88, 44, '2017-06-10', '10:30:00', 'Bajo', 9, 0),
(89, 41, '2017-06-08', '11:00:00', 'Principiante', 5, 0),
(90, 73, '2017-06-24', '13:00:00', 'Medio', 4, 0),
(91, 59, '2017-06-17', '12:00:00', 'Principiante', 7, 0),
(92, 43, '2017-06-08', '11:00:00', 'Principiante', 4, 0),
(93, 73, '2017-06-15', '11:00:00', 'Principiante', 3, 0),
(94, 55, '2017-06-14', '11:00:00', 'Principiante', 6, 0),
(95, 2, '2017-06-07', '15:00:00', 'Medio', 4, 0),
(96, 55, '2017-06-09', '15:00:00', 'Bajo', 3, 0),
(97, 72, '2017-06-13', '15:00:00', 'Bajo', 3, 0),
(98, 55, '2017-06-10', '15:00:00', 'Bajo', 4, 0),
(99, 2, '2017-06-10', '15:00:00', 'Principiante', 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INSTALACION`
--

CREATE TABLE `INSTALACION` (
  `CodInst` int(11) NOT NULL,
  `NomInst` varchar(100) NOT NULL,
  `ProvInst` varchar(30) NOT NULL,
  `LocalidadInst` varchar(30) NOT NULL,
  `DirecInst` varchar(100) NOT NULL,
  `Latitud` float(10,6) NOT NULL,
  `Longitud` float(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `INSTALACION`
--

INSERT INTO `INSTALACION` (`CodInst`, `NomInst`, `ProvInst`, `LocalidadInst`, `DirecInst`, `Latitud`, `Longitud`) VALUES
(17, 'Club del Hielo', 'Málaga', 'Benalmádena', 'Av. Federico García Lorca Nº3', 36.596844, -4.531694),
(18, 'Club los Caballeros', 'Málaga', 'Benalmádena', 'Av. de los Argonautas Nº12', 36.592144, -4.557645),
(19, 'Club la Colina', 'Málaga', 'Torremolinos', 'Calle Colina Nº5', 36.639339, -4.493254),
(20, 'El club de la raqueta', 'Málaga', 'Benalmádena', 'Av. las Palmeras Nº34', 36.591251, -4.535849),
(21, 'Club Higuerón', 'Málaga', 'Benalmádena', 'Carretera Benalmádena a Mijas Km31', 36.581310, -4.595722),
(22, 'BeLife', 'Málaga', 'Campanillas', 'Calle Marie Curie 26', 36.738869, -4.547693),
(23, 'Inaqua', 'Málaga', 'Málaga', 'Calle Marilyn Monroe Nº105', 36.681030, -4.458220),
(24, 'Atenas', 'Málaga', 'Antequera', 'Av. de Gandhi Nº23', 37.014709, -4.556964),
(25, 'Polideportivo Fuengirola', 'Málaga', 'Fuengirola', 'Calle Menorca Nº2', 36.555359, -4.616345),
(26, 'Polideportivo Torremolinos', 'Málaga', 'Torremolinos', 'Calle Pedro Navarro Bruna Nº8', 36.627045, -4.502309),
(27, 'Polideportivo Cartama', 'Málaga', 'Cártama', 'Av. de los Juegos Olímpicos Nº1', 36.713081, -4.631914),
(28, 'Polideportivo Alameda', 'Málaga', 'Alameda', 'Calle Joaquín Blume Nº7', 37.208530, -4.657092),
(29, 'Antequera Golf', 'Málaga', 'Antequera', 'Camino de Gandía Nº23', 37.017048, -4.599463),
(30, 'Polideportivo Antequera', 'Málaga', 'Antequera', 'Av. Alameda de Andalucía Nº12', 37.023174, -4.564731),
(31, 'Polideportivo Pizarra', 'Málaga', 'Pizarra', 'Calle Vicente Aleixandre Nº44', 36.767887, -4.708433),
(32, 'Alhaurin Sport', 'Málaga', 'Alhaurin de la Torre', 'Av. el Limón Nº65', 36.664261, -4.578350),
(33, 'Chiringuito la Cubana', 'Málaga', 'Benalmádena', 'Carretera de Cádiz Nº10', 36.580765, -4.548520),
(34, 'Torcal Antequera', 'Málaga', 'Antequera', 'Carretera del Torcal s/n', 36.951462, -4.544722);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PARTICIPACION`
--

CREATE TABLE `PARTICIPACION` (
  `CodUs` int(11) NOT NULL,
  `CodEven` int(11) NOT NULL,
  `Valoracion` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `PARTICIPACION`
--

INSERT INTO `PARTICIPACION` (`CodUs`, `CodEven`, `Valoracion`) VALUES
(1, 17, 1),
(1, 18, 1),
(1, 20, 5),
(1, 29, 2),
(1, 66, NULL),
(1, 87, NULL),
(1, 89, NULL),
(1, 90, NULL),
(1, 93, NULL),
(1, 94, NULL),
(1, 95, NULL),
(1, 96, NULL),
(1, 97, NULL),
(1, 98, NULL),
(1, 99, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PISTA`
--

CREATE TABLE `PISTA` (
  `CodPista` int(11) NOT NULL,
  `CodInst` int(11) NOT NULL,
  `CodDep` int(11) NOT NULL,
  `NomPist` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `PISTA`
--

INSERT INTO `PISTA` (`CodPista`, `CodInst`, `CodDep`, `NomPist`) VALUES
(2, 17, 1, 'B'),
(41, 19, 3, 'F'),
(42, 20, 4, 'A'),
(43, 21, 5, 'C'),
(44, 22, 6, 'B'),
(45, 23, 7, 'F'),
(46, 24, 8, 'E'),
(47, 25, 9, 'A'),
(48, 26, 10, 'B'),
(49, 27, 11, 'C'),
(50, 28, 12, 'D'),
(51, 29, 13, 'E'),
(52, 30, 14, 'F'),
(53, 31, 15, 'A'),
(54, 32, 1, 'B'),
(55, 18, 2, 'C'),
(56, 19, 3, 'D'),
(57, 20, 4, 'E'),
(58, 21, 5, 'F'),
(59, 22, 6, 'E'),
(60, 19, 15, '3'),
(61, 20, 14, '1'),
(62, 21, 13, '4'),
(63, 22, 12, '2'),
(64, 23, 11, '6'),
(65, 24, 10, 'A'),
(66, 25, 9, '4'),
(67, 26, 8, 'B'),
(68, 27, 7, '3'),
(69, 28, 6, '7'),
(70, 29, 5, 'C'),
(71, 30, 4, '3'),
(72, 31, 3, '2'),
(73, 32, 2, 'E'),
(74, 18, 1, '2'),
(75, 19, 3, '1'),
(76, 20, 4, '6'),
(77, 21, 5, '2'),
(78, 22, 6, '5'),
(79, 33, 16, 'Playa Torrequebrada'),
(80, 34, 17, 'Paraje Natural Torcal'),
(81, 23, 19, 'Piscina Olímpica'),
(82, 27, 18, '7B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PREFERENCIA`
--

CREATE TABLE `PREFERENCIA` (
  `CodDep` int(11) NOT NULL,
  `CodUs` int(11) NOT NULL,
  `NivelUs` varchar(30) NOT NULL DEFAULT 'Principiante'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `PREFERENCIA`
--

INSERT INTO `PREFERENCIA` (`CodDep`, `CodUs`, `NivelUs`) VALUES
(4, 1, 'Principiante'),
(5, 1, 'Principiante'),
(6, 1, 'Principiante'),
(12, 1, 'Principiante'),
(14, 1, 'Principiante'),
(16, 1, 'Principiante'),
(17, 1, 'Principiante'),
(1, 2, 'Medio'),
(3, 2, 'Principiante'),
(4, 2, 'Alto'),
(6, 2, 'Principiante'),
(16, 2, 'Principiante'),
(17, 2, 'Medio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO`
--

CREATE TABLE `USUARIO` (
  `CodUs` int(11) NOT NULL,
  `NomUs` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `PassUs` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `EmailUs` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `FechNac` date NOT NULL,
  `ProvUs` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `LocaUs` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DescUs` varchar(140) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `FotoUs` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT 'defecto.png',
  `Admin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `USUARIO`
--

INSERT INTO `USUARIO` (`CodUs`, `NomUs`, `PassUs`, `EmailUs`, `FechNac`, `ProvUs`, `LocaUs`, `DescUs`, `FotoUs`, `Admin`) VALUES
(1, 'ElianaFerioli', 'usuario', 'elianaferioli@hotmail.com', '1989-05-23', 'Málaga', 'Antequera', 'Solo sé placar.', 'defecto.png', 1),
(2, 'Jose', 'usuario', 'usuario2@usuario.com', '1985-01-02', 'Málaga', 'Alameda', 'Apasionado del deporte al aire libre', 'usuario2.jpg', 0),
(3, 'Silvia', 'usuario', 'usuario3@usuario.com', '1989-05-23', 'Málaga', 'Torremolinos', 'descripcion', 'defecto.png', 0),
(4, 'Aldo', 'usuario', 'usuario4@usuario.com', '1986-04-22', 'Málaga', 'Fuengirola', 'descripcion', 'defecto.png', 0),
(5, 'Ana', 'usuario', 'usuario5@usuario.com', '1987-03-21', 'Málaga', 'Cártama', 'descripcion', 'defecto.png', 0),
(6, 'Pablo', 'usuario', 'usuario6@usuario.com', '1988-02-20', 'Málaga', 'Churriana', 'descripcion', 'defecto.png', 0),
(7, 'Francisco', 'usuario', 'usuario7@usuario.com', '1989-01-19', 'Málaga', 'Pizarra', 'descripcion', 'defecto.png', 0),
(8, 'Elena', 'usuario', 'usuario8@usuario.com', '1990-06-18', 'Málaga', 'Rincón de la Victoria', 'descripcion', 'defecto.png', 0),
(9, 'Angel', 'usuario', 'usuario9@usuario.com', '1991-07-17', 'Málaga', 'Mijas', 'descripcion', 'defecto.png', 0),
(10, 'Sofía', 'usuario', 'usuario10@usuario.com', '1992-08-16', 'Málaga', 'Teatinos', 'descripcion', 'defecto.png', 0),
(11, 'Miguel', 'usuario', 'usuario11@usuario.com', '1993-09-15', 'Málaga', 'Torremolinos', 'descripcion', 'defecto.png', 0),
(12, 'Alejandro', 'usuario', 'usuario12@usuario.com', '1994-10-14', 'Málaga', 'Fuengirola', 'descripcion', 'defecto.png', 0),
(13, 'David', 'usuario', 'usuario13@usuario.com', '1995-11-13', 'Málaga', 'Málaga', 'descripcion', 'defecto.png', 0),
(14, 'Javier', 'usuario', 'usuario14@usuario.com', '1996-12-12', 'Málaga', 'Churriana', 'descripcion', 'defecto.png', 0),
(15, 'Alberto', 'usuario', 'usuario15@usuario.com', '1997-01-11', 'Málaga', 'El Palo', 'descripcion', 'defecto.png', 0),
(16, 'Catalina', 'usuario', 'usuario16@usuario.com', '1998-02-10', 'Málaga', 'Marbella', 'descripcion', 'defecto.png', 0),
(17, 'Carlos', 'usuario', 'usuario17@usuario.com', '1999-03-09', 'Málaga', 'Playamar', 'descripcion', 'defecto.png', 0),
(18, 'Marilo', 'usuario', 'usuario18@usuario.com', '2000-04-08', 'Málaga', 'Alhaurin el Grande', 'descripcion', 'defecto.png', 0),
(19, 'Antonio', 'usuario', 'usuario19@usuario.com', '1985-05-07', 'Málaga', 'Torre del mar', 'descripcion', 'defecto.png', 0),
(20, 'Santiago', 'usuario', 'usuario20@usuario.com', '1986-06-06', 'Málaga', 'Nerja', 'descripcion', 'defecto.png', 0),
(21, 'Moises', 'usuario', 'usuario21@usuario.com', '1987-07-05', 'Málaga', 'Torremolinos', 'descripcion', 'defecto.png', 0),
(22, 'Luis', 'usuario', 'usuario22@usuario.com', '1988-08-04', 'Málaga', 'Teatinos', 'descripcion', 'defecto.png', 0),
(23, 'Jorge', 'usuario', 'usuario23@usuario.com', '1989-09-03', 'Málaga', 'Benalmádena', 'descripcion', 'defecto.png', 0),
(24, 'Rubén', 'usuario', 'usuario24@usuario.com', '1990-10-02', 'Málaga', 'Capuchinos', 'descripcion', 'defecto.png', 0),
(25, 'Andrés', 'usuario', 'usuario25@usuario.com', '1989-05-09', 'Granada', 'La herradura', NULL, 'defecto.png', 0),
(26, 'Tomás', 'usuario', 'usuario26@usuario.com', '1989-05-23', 'Huelva', 'El Rocío', NULL, 'defecto.png', 0),
(27, 'usuario', 'usuario', 'usuario89@usuario.com', '1998-06-18', 'Málaga', 'Antequera', NULL, 'defecto.png', 0),
(28, 'nuevo', 'nuevo', 'nuevo@nuevonuevo.com', '1998-06-13', 'Málaga', 'Antequera', NULL, 'defecto.png', 0),
(29, 'usuario', 'usuario', 'usuario88@usuario.com', '1998-06-04', 'Málaga', 'Antequera', NULL, 'defecto.png', 0),
(30, 'nuevito', 'nuevito', 'nuevito@jj.com', '1998-06-12', 'Málaga', 'Antequera', NULL, 'defecto.png', 0),
(31, 'us', 'us', 'usu@jhsd.com', '1998-06-19', 'Málaga', 'Antequera', NULL, 'defecto.png', 0),
(32, 'pepito', 'pepe', 'pepito@pepito.com', '1998-06-06', 'Málaga', 'Antequera', NULL, 'defecto.png', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `DEPORTE`
--
ALTER TABLE `DEPORTE`
  ADD PRIMARY KEY (`CodDep`);

--
-- Indices de la tabla `EVENTO`
--
ALTER TABLE `EVENTO`
  ADD PRIMARY KEY (`CodEven`),
  ADD KEY `CodPista` (`CodPista`);

--
-- Indices de la tabla `INSTALACION`
--
ALTER TABLE `INSTALACION`
  ADD PRIMARY KEY (`CodInst`);

--
-- Indices de la tabla `PARTICIPACION`
--
ALTER TABLE `PARTICIPACION`
  ADD PRIMARY KEY (`CodUs`,`CodEven`),
  ADD KEY `CodEven` (`CodEven`);

--
-- Indices de la tabla `PISTA`
--
ALTER TABLE `PISTA`
  ADD PRIMARY KEY (`CodPista`),
  ADD KEY `CodInst` (`CodInst`),
  ADD KEY `CodDep` (`CodDep`);

--
-- Indices de la tabla `PREFERENCIA`
--
ALTER TABLE `PREFERENCIA`
  ADD PRIMARY KEY (`CodUs`,`CodDep`),
  ADD KEY `CodDep` (`CodDep`);

--
-- Indices de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`CodUs`),
  ADD UNIQUE KEY `EmailUs` (`EmailUs`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `DEPORTE`
--
ALTER TABLE `DEPORTE`
  MODIFY `CodDep` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `EVENTO`
--
ALTER TABLE `EVENTO`
  MODIFY `CodEven` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- AUTO_INCREMENT de la tabla `INSTALACION`
--
ALTER TABLE `INSTALACION`
  MODIFY `CodInst` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT de la tabla `PISTA`
--
ALTER TABLE `PISTA`
  MODIFY `CodPista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `CodUs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `EVENTO`
--
ALTER TABLE `EVENTO`
  ADD CONSTRAINT `EVENTO_ibfk_1` FOREIGN KEY (`CodPista`) REFERENCES `PISTA` (`CodPista`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `PARTICIPACION`
--
ALTER TABLE `PARTICIPACION`
  ADD CONSTRAINT `PARTICIPACION_ibfk_1` FOREIGN KEY (`CodUs`) REFERENCES `USUARIO` (`CodUs`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PARTICIPACION_ibfk_2` FOREIGN KEY (`CodEven`) REFERENCES `EVENTO` (`CodEven`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `PISTA`
--
ALTER TABLE `PISTA`
  ADD CONSTRAINT `PISTA_ibfk_1` FOREIGN KEY (`CodInst`) REFERENCES `INSTALACION` (`CodInst`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PISTA_ibfk_2` FOREIGN KEY (`CodDep`) REFERENCES `DEPORTE` (`CodDep`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `PREFERENCIA`
--
ALTER TABLE `PREFERENCIA`
  ADD CONSTRAINT `PREFERENCIA_ibfk_1` FOREIGN KEY (`CodUs`) REFERENCES `USUARIO` (`CodUs`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PREFERENCIA_ibfk_2` FOREIGN KEY (`CodDep`) REFERENCES `DEPORTE` (`CodDep`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
