import { Router } from "express";
import checkAuth from "./auth.js";
//import checkAuth from "check-auth";


export default function router(logoutWebSocket) {
const router = Router()
router.get('/', (req,res) => {
    res.render(login);
});

router.post('/login', (req,res) => {
    const user = req.body.username
    const pw = req.body.password
    if(user ==="u1" && pw === "test") {
        req.session.user = "u1"
    }else if (user ==="u2" && pw === "test") {
        req.session.user = "u2"
    }
     res.redirect("/chat")
})

router.get('/chat',  (req,res) => {
    res.render('chat', {user:req.session.user})
})

router.get('/logout', (req,res) => {
    logoutWebSocket(req.session.user);
    delete req.session.user
    res.redirect('/')
})

return router
}

