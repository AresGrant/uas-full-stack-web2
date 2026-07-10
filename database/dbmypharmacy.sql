-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Jul 2026 pada 01.25
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmypharmacy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `detailpembelian`
--

CREATE TABLE `detailpembelian` (
  `idDetailPembelian` int(16) NOT NULL,
  `idPembelian` int(16) NOT NULL,
  `idObat` int(16) NOT NULL,
  `jumlah` int(16) NOT NULL,
  `harga` decimal(12,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detailpenjualan`
--

CREATE TABLE `detailpenjualan` (
  `idDetailPenjualan` int(16) NOT NULL,
  `idPenjualan` int(16) NOT NULL,
  `idObat` int(16) NOT NULL,
  `jumlah` int(16) NOT NULL,
  `harga` decimal(12,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `golobat`
--

CREATE TABLE `golobat` (
  `idGol` int(16) NOT NULL,
  `namaGol` varchar(100) NOT NULL,
  `kode` varchar(20) NOT NULL,
  `perluResep` tinyint(1) NOT NULL,
  `perluIdentitas` tinyint(1) NOT NULL,
  `perluSIPA` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelasterapi`
--

CREATE TABLE `kelasterapi` (
  `idKelas` int(16) NOT NULL,
  `namaKelas` varchar(150) NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `obat`
--

CREATE TABLE `obat` (
  `idObat` int(16) NOT NULL,
  `kodeObat` varchar(30) NOT NULL,
  `namaObat` varchar(150) NOT NULL,
  `idSubKelas` int(16) NOT NULL,
  `idGol` int(16) NOT NULL,
  `idSuplier` int(16) NOT NULL,
  `satuan` varchar(20) NOT NULL,
  `stok` int(16) NOT NULL,
  `stokMin` int(16) NOT NULL,
  `hargaBeli` decimal(12,2) NOT NULL,
  `hargaJual` decimal(12,2) NOT NULL,
  `noBatch` varchar(50) NOT NULL,
  `tglKadaluarsa` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggan`
--

CREATE TABLE `pelanggan` (
  `idPelanggan` int(16) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `noHP` varchar(20) NOT NULL,
  `noKTP` varchar(30) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelian`
--

CREATE TABLE `pembelian` (
  `idPembelian` int(16) NOT NULL,
  `noPembelian` varchar(30) NOT NULL,
  `idSuplier` int(16) NOT NULL,
  `idUser` int(16) NOT NULL,
  `tglPembelian` datetime NOT NULL,
  `total` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `penjualan`
--

CREATE TABLE `penjualan` (
  `idPenjualan` int(16) NOT NULL,
  `noFaktur` varchar(30) NOT NULL,
  `idPelanggan` int(16) NOT NULL,
  `idUser` int(16) NOT NULL,
  `tglPenjualan` datetime NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `bayar` decimal(12,2) NOT NULL,
  `kembalian` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `subkelasterapi`
--

CREATE TABLE `subkelasterapi` (
  `idSubKelas` int(16) NOT NULL,
  `idKelas` int(16) NOT NULL,
  `namaSubKelas` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `suplier`
--

CREATE TABLE `suplier` (
  `idSuplier` int(16) NOT NULL,
  `namaSuplier` varchar(150) NOT NULL,
  `alamat` text NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `idUser` int(16) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','apoteker','kasir','') NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detailpembelian`
--
ALTER TABLE `detailpembelian`
  ADD PRIMARY KEY (`idDetailPembelian`),
  ADD KEY `fk_detailpembelian_obat` (`idObat`),
  ADD KEY `fk_detailpembelian_pembelian` (`idPembelian`);

--
-- Indeks untuk tabel `detailpenjualan`
--
ALTER TABLE `detailpenjualan`
  ADD PRIMARY KEY (`idDetailPenjualan`),
  ADD KEY `fk_detailpenjualan_penjualan` (`idPenjualan`),
  ADD KEY `fk_detailpenjualan_obat` (`idObat`);

--
-- Indeks untuk tabel `golobat`
--
ALTER TABLE `golobat`
  ADD PRIMARY KEY (`idGol`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indeks untuk tabel `kelasterapi`
--
ALTER TABLE `kelasterapi`
  ADD PRIMARY KEY (`idKelas`);

--
-- Indeks untuk tabel `obat`
--
ALTER TABLE `obat`
  ADD PRIMARY KEY (`idObat`),
  ADD UNIQUE KEY `kodeObat` (`kodeObat`),
  ADD KEY `fk_obat_subkelas` (`idSubKelas`),
  ADD KEY `fk_obat_golobat` (`idGol`),
  ADD KEY `fk_obat_suplier` (`idSuplier`);

--
-- Indeks untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`idPelanggan`);

--
-- Indeks untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`idPembelian`),
  ADD UNIQUE KEY `noPembelian` (`noPembelian`),
  ADD KEY `fk_pembelian_suplier` (`idSuplier`),
  ADD KEY `fk_pembelian_user` (`idUser`);

--
-- Indeks untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`idPenjualan`),
  ADD UNIQUE KEY `noFaktur` (`noFaktur`),
  ADD KEY `fk_penjualan_pelanggan` (`idPelanggan`),
  ADD KEY `fk_penjualan_user` (`idUser`);

--
-- Indeks untuk tabel `subkelasterapi`
--
ALTER TABLE `subkelasterapi`
  ADD PRIMARY KEY (`idSubKelas`),
  ADD KEY `fk_subkelas_kelas` (`idKelas`);

--
-- Indeks untuk tabel `suplier`
--
ALTER TABLE `suplier`
  ADD PRIMARY KEY (`idSuplier`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detailpembelian`
--
ALTER TABLE `detailpembelian`
  MODIFY `idDetailPembelian` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `detailpenjualan`
--
ALTER TABLE `detailpenjualan`
  MODIFY `idDetailPenjualan` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `golobat`
--
ALTER TABLE `golobat`
  MODIFY `idGol` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kelasterapi`
--
ALTER TABLE `kelasterapi`
  MODIFY `idKelas` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `obat`
--
ALTER TABLE `obat`
  MODIFY `idObat` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `idPelanggan` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `idPembelian` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  MODIFY `idPenjualan` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `subkelasterapi`
--
ALTER TABLE `subkelasterapi`
  MODIFY `idSubKelas` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `suplier`
--
ALTER TABLE `suplier`
  MODIFY `idSuplier` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(16) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detailpembelian`
--
ALTER TABLE `detailpembelian`
  ADD CONSTRAINT `fk_detailpembelian_obat` FOREIGN KEY (`idObat`) REFERENCES `obat` (`idObat`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detailpembelian_pembelian` FOREIGN KEY (`idPembelian`) REFERENCES `pembelian` (`idPembelian`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `detailpenjualan`
--
ALTER TABLE `detailpenjualan`
  ADD CONSTRAINT `fk_detailpenjualan_obat` FOREIGN KEY (`idObat`) REFERENCES `obat` (`idObat`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detailpenjualan_penjualan` FOREIGN KEY (`idPenjualan`) REFERENCES `penjualan` (`idPenjualan`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `obat`
--
ALTER TABLE `obat`
  ADD CONSTRAINT `fk_obat_golobat` FOREIGN KEY (`idGol`) REFERENCES `golobat` (`idGol`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_obat_subkelas` FOREIGN KEY (`idSubKelas`) REFERENCES `subkelasterapi` (`idSubKelas`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_obat_suplier` FOREIGN KEY (`idSuplier`) REFERENCES `suplier` (`idSuplier`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD CONSTRAINT `fk_pembelian_suplier` FOREIGN KEY (`idSuplier`) REFERENCES `suplier` (`idSuplier`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pembelian_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `fk_penjualan_pelanggan` FOREIGN KEY (`idPelanggan`) REFERENCES `pelanggan` (`idPelanggan`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_penjualan_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `subkelasterapi`
--
ALTER TABLE `subkelasterapi`
  ADD CONSTRAINT `fk_subkelas_kelas` FOREIGN KEY (`idKelas`) REFERENCES `kelasterapi` (`idKelas`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
