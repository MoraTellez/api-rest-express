import 'dotenv/config'
import './database/db.js'
import express from "express";
import cookieParser from 'cookie-parser';
import routerAuth from './routes/auth.js';
import routerLink from './routes/link.js'


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', routerAuth)
app.use('/api/links', routerLink)

const PORT = process.env.PORT || 5000
app.listen(5000, () => {
  console.log('🔥🔥🔥 http://localhost:'+ PORT)
})