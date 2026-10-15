
import express from 'express'
import apiRoutes from './routes/api.routes.js'

const app = express()

app.use(express.json())
app.use('/api', apiRoutes)

app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint tidak ditemukan',
    })
})

export default app
