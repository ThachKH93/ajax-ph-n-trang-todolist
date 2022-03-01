const express = require('express'); //B1
const app = express(); // tạo app //B2
const path = require("path") // dùng path lấy link tuyệt đối

const cookieParser = require('cookie-parser')

const UserRouter = require('./routerUser')
const TodolistrRouter = require('./routerTodolist')


const UserModel100 = require('./banguser')
const checkLogin = require('./checkLogin')

app.use(cookieParser())

app.use(express.urlencoded({extended: true})) //B1 setup để nhận data từ body đoạn urlencoded
// dùng body urlencoded trong postman để nhập data mới vào database
app.use(express.json()) //B2 đọc data chỉ về dạng json

app.use('/user', UserRouter) // router
app.use('/todolist', TodolistrRouter) // router
// dùng get, put, post, delete trên trình duyệt
app.use('/public', express.static(path.join(__dirname, './public')));//B2
app.get('/dangky', function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/dangky.html')) //  dùng path lấy link tuyệt đối của file html css
}) // B1

app.get('/sing',checkLogin, function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/singup.html')) //  đẩy html lên sever
}) 


app.get('/change', checkLogin , function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/changePass.html')) //  đẩy html lên sever
}) 


// app.get('/home', function(req, res){ // 
//     console.log(33, req.cookies);
//     res.sendFile(path.join(__dirname, './view/home.html')) //  đẩy html lên sever
// }) 

// app.get('/home', (req, res) =>{
//     console.log(39, req.cookies.userID);
//     if (req.cookies.userID) { // kiểm tra id khi load lại trang /home
//         res.sendFile(path.join(__dirname, './view/home.html'))
//     }else{
//         res.redirect('/login') // chuyển sang trang /login khi sai id , sever chuyển trang của cilent
//     }
// })

// app.get('/home', async (req, res) =>{
//     try {
//         console.log(39, req.cookies.userID);
//         if (req.cookies.userID) { // kiểm tra id khi load lại trang /home
//             const user = await UserModel100.findOne({_id: req.cookies.userID})
//             if (user) {
//                 res.sendFile(path.join(__dirname, './view/home.html'))
//             } else {
//                 res.redirect('/login')
//             }
            
//         }else{
//             res.redirect('/login') // chuyển sang trang /login khi sai id , sever chuyển trang của cilent
//         }
//     } catch (error) {
//         res.redirect('/login')
//     }
// })


// checkLogin nằm trong đường dẫn nên req, res dùng chung
// res.sendFile(path.join(__dirname, './view/home.html')) như bước kế tiếp nếu đã thông qua bộ lọc id của checkLogin
app.get('/home', checkLogin, async (req, res) =>{ // checkLogin như bộ lọc id 
    res.sendFile(path.join(__dirname, './view/home.html')) // next
})

app.get('/login', function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/login.html')) //  đẩy html lên sever
}) 
app.get('/QQ', function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/thach-buoi24.html')) //  đẩy html lên sever
})



app.listen(4000); //B3