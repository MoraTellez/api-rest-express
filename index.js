import 'dotenv/config'
import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors'

import routerAuth from './routes/auth.js';
import routerLink from './routes/link.js';
import routerRedirect from './routes/redirect.js'

const app = express();
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
  origin: function(origin, callback) {
    if(!origin || whiteList.includes(origin)){
      return callback(null, origin)
    }

    return callback(`Error CROS: ${origin} no autorizado`)
  },
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', routerAuth)
app.use('/api/links', routerLink)
app.use('/', routerRedirect)

const PORT = process.env.PORT || 5000
app.listen(5000, () => {
  console.log('🔥🔥🔥 http://localhost:'+ PORT)
})

import './database/db.js'
