import 'dotenv/config'
import './database/db.js'
import express from "express";
import routerAuth from './routes/auth.js';


const app = express();
app.use(express.json())
app.use('/api/auth', routerAuth)

const PORT = process.env.PORT || 5000
app.listen(5000, () => {
  console.log('🔥🔥🔥 http://localhost:'+ PORT)
})