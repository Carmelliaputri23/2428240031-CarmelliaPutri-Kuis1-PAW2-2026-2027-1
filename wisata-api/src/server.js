
import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/database.js'

await connectDB()

const PORT = process.env.APP_PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
