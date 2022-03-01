const express = require('express'); //B1
const app = express(); // tạo app //B2
const path = require("path") // dùng path lấy link tuyệt đối
const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser')

const UserRouter = require('./routerUser')
const TodolistrRouter = require('./routerTodolist')
const TodoRouter1 = require('./rounTodo')


const UserModel100 = require('./banguser')
const checkLogin = require('./checkLogin')

app.use(cookieParser())

app.use(express.urlencoded({extended: true})) //B1 setup để nhận data từ body đoạn urlencoded
app.use(express.json()) //B2 đọc data chỉ về dạng json

app.use('/user', UserRouter) // router
app.use('/todolist', TodolistrRouter) // router
app.use('/Todo', TodoRouter1) // router

app.use('/public', express.static(path.join(__dirname, './public')));//B2

app.get('/hometodo',checkLogin, function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/todo.html')) //  đẩy html lên sever
})
app.get('/dangky', function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/dky.html')) //  dùng path lấy link tuyệt đối của file html css
}) // B1

app.get('/login', function(req, res){ // 
    res.sendFile(path.join(__dirname, './view/loginTodo.html')) //  đẩy html lên sever
})

app.listen(4000); //B3