
import express from 'express'
import WisataController from '../controllers/wisata.controller.js'

const router = express.Router()

router.post('/wisata', (req, res) => WisataController.store(req, res))
router.get('/wisata', (req, res) =>WisataController.index(req, res))
router.get('/wisata/:id', (req, res) => WisataController.show(req, res))
router.put('/wisata/:id', (req, res) => WisataController.update(req, res))
router.delete('/wisata/:id', (req, res) =>WisataController.destroy(req, res))

export default router
