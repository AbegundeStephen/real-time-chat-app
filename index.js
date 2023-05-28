import express from 'express'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import cookieSession from 'cookie-session'
import router from './app/routes.js'
import initWebSocket from './app/websocket.js'

const logoutWebSocket = initWebSocket()
const app = express()
app.set('views', `${dirname(fileURLToPath(import.meta.url))}/app/views`)
app.set('view engine','pug')
app.get('/', (req,res) => {
    res.render('login')
})
app.use(cookieSession({
  name:'session',
  keys:["key1","key2"]
}))


app.use(express.urlencoded({extended:false}))
app.use(router(logoutWebSocket))
app.listen(8080, () => console.log(`server listening to http://localhost:8080`))
