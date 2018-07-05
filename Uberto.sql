-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2018 a las 00:34:50
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `choferes`
--

CREATE TABLE `choferes` (
  `user` varchar(50) NOT NULL,
  `comodidad` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `choferes`
--

INSERT INTO `choferes` (`user`, `comodidad`) VALUES
('chofer', 1),
('Jorge', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chof_viaje`
--

CREATE TABLE `chof_viaje` (
  `cod_Viaje` int(11) NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT '2',
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chof_viaje`
--

INSERT INTO `chof_viaje` (`cod_Viaje`, `user`, `estado`, `fecha`) VALUES
(10, 'Jorge', 2, '2018-07-03 16:29:12'),
(12, 'chofer', 3, '2018-07-03 16:29:12'),
(13, 'chofer', 3, '2018-07-03 16:29:12'),
(14, 'chofer', 3, '2018-07-03 16:29:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user` varchar(50) NOT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user`, `pass`, `nivel`) VALUES
('admin', '1234', 1),
('chofer', '1234', 2),
('cliente', '1234', 3),
('Jorge', '123456', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `patente` varchar(6) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`patente`, `marca`, `modelo`) VALUES
('aaa123', 'fiat', '1997');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `cod_Viaje` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `comodidad` int(11) NOT NULL,
  `pago` varchar(15) NOT NULL,
  `latOr` double NOT NULL,
  `lonOr` double NOT NULL,
  `latDes` double NOT NULL,
  `lonDes` double NOT NULL,
  `user` varchar(50) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`cod_Viaje`, `fecha`, `comodidad`, `pago`, `latOr`, `lonOr`, `latDes`, `lonDes`, `user`, `estado`) VALUES
(5, '2018-07-03 16:29:12', 2, 'PayPal', -34.676989877719, -58.423340896365, -34.698021478556, -58.411324599978, 'cliente', 2),
(6, '2018-07-03 15:35:28', 1, 'PayPal', -34.683130528191, -58.418448547121, -34.693999068852, -58.402140716311, 'cliente', 3),
(10, '2018-07-19 17:53:25', 3, 'Visa', -34.678381710173, -58.424695411917, -34.686427851922, -58.408301750418, 'cliente', 2),
(11, '2018-07-26 02:53:39', 2, 'PayPal', -34.670758328362, -58.415940681693, -34.682404878784, -58.407958427664, 'cliente', 1),
(12, '2018-07-04 15:08:00', 1, 'Visa', -34.675838455062, -58.42597281396, -34.684026001671, -58.420737141963, 'cliente', 3),
(13, '2018-07-05 15:14:18', 1, 'PayPal', -34.770149557712, -58.399863319209, -34.774238764546, -58.389735297969, 'cliente', 3),
(14, '2018-07-19 15:41:57', 1, 'PayPal', -34.733007774569, -58.412794447557, -34.708739475025, -58.452276564257, 'cliente', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `choferes`
--
ALTER TABLE `choferes`
  ADD PRIMARY KEY (`user`);

--
-- Indices de la tabla `chof_viaje`
--
ALTER TABLE `chof_viaje`
  ADD PRIMARY KEY (`cod_Viaje`),
  ADD KEY `fk_chof` (`user`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`patente`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`cod_Viaje`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `cod_Viaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `choferes`
--
ALTER TABLE `choferes`
  ADD CONSTRAINT `fk_chofer` FOREIGN KEY (`user`) REFERENCES `usuarios` (`user`);

--
-- Filtros para la tabla `chof_viaje`
--
ALTER TABLE `chof_viaje`
  ADD CONSTRAINT `fk_chof` FOREIGN KEY (`user`) REFERENCES `choferes` (`user`),
  ADD CONSTRAINT `fk_viaje` FOREIGN KEY (`cod_Viaje`) REFERENCES `viajes` (`cod_Viaje`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
