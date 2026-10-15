
import mongoose from 'mongoose'
import Wisata from '../models/Wisata.js'

const validBody = (body) =>
  typeof body.nama_wisata === 'string' &&
  body.nama_wisata.trim().length > 0 &&
  typeof body.lokasi === 'string' &&
  body.lokasi.trim().length > 0 &&
  typeof body.harga_tiket === 'number' &&
  Number.isFinite(body.harga_tiket) &&
  body.harga_tiket >= 0

class WisataController {
  // POST /api/wisata
  async store(req, res) {
    try {
      if (!validBody(req.body)) {
        return res.status(400).json({
          message: 'Nama wisata, lokasi, dan harga tiket wajib diisi dengan tipe data yang benar',
        })
      }

      const wisata = await Wisata.create({
        nama_wisata: req.body.nama_wisata.trim(),
        lokasi: req.body.lokasi.trim(),
        harga_tiket: req.body.harga_tiket,
      })

      return res.status(201).json({
        message: 'Data wisata berhasil ditambahkan',
        data: wisata,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Gagal menambahkan data wisata',
      })
    }
  }

  // GET /api/wisata
  async index(req, res) {
    try {
      const data = await Wisata.find()

      return res.status(200).json({
        message: 'Data wisata berhasil diambil',
        total: data.length,
        data,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Gagal mengambil data wisata',
      })
    }
  }

  // GET /api/wisata/:id
  async show(req, res) {
    try {
      const { id } = req.params

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: 'Format ID wisata tidak valid',
        })
      }

      const wisata = await Wisata.findById(id)

      if (!wisata) {
        return res.status(404).json({
          message: 'Data wisata tidak ditemukan',
        })
      }

      return res.status(200).json({
        message: 'Detail wisata berhasil diambil',
        data: wisata,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Gagal mengambil detail wisata',
      })
    }
  }

  // PUT /api/wisata/:id
  async update(req, res) {
    try {
      const { id } = req.params

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: 'Format ID wisata tidak valid',
        })
      }

      if (!validBody(req.body)) {
        return res.status(400).json({
          message: 'Ketiga field wajib diisi dengan tipe data yang benar',
        })
      }

      const wisata = await Wisata.findByIdAndUpdate(
        id,
        {
          nama_wisata: req.body.nama_wisata.trim(),
          lokasi: req.body.lokasi.trim(),
          harga_tiket: req.body.harga_tiket,
        },
        {
          new: true,
          runValidators: true,
        },
      )

      if (!wisata) {
        return res.status(404).json({
          message: 'Data wisata tidak ditemukan',
        })
      }

      return res.status(200).json({
        message: 'Data wisata berhasil diperbarui',
        data: wisata,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Gagal memperbarui data wisata',
      })
    }
  }

  // DELETE /api/wisata/:id
  async destroy(req, res) {
    try {
      const { id } = req.params

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: 'Format ID wisata tidak valid',
        })
      }

      const wisata = await Wisata.findByIdAndDelete(id)

      if (!wisata) {
        return res.status(404).json({
          message: 'Data wisata tidak ditemukan',
        })
      }

      return res.status(200).json({
        message: 'Data wisata berhasil dihapus',
        data: wisata,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Gagal menghapus data wisata',
      })
    }
  }
}

export default new WisataController()
