
import mongoose from 'mongoose'

const wisataSchema = new mongoose.Schema(
    {
        nama_wisata: {
            type: String,
            required: [true, 'Nama wisata wajib diisi'],
            trim: true,
        },
        lokasi: {
            type: String,
            required: [true, 'Lokasi wisata wajib diisi'],
            trim: true,
        },
        harga_tiket: {
            type: Number,
            required: [true, 'Harga tiket wajib diisi'],
            min: [0, 'Harga tiket tidak boleh negatif'],
        },
    },
    {
        collection: 'wisata',
        versionKey: false,
    },
)

const Wisata = mongoose.model('Wisata', wisataSchema)

export default Wisata
