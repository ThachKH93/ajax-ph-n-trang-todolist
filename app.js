const express = require('express'); //B1
const app = express(); // tạo app //B2
const path = require("path") // dùng path lấy link tuyệt đối
// console.log(express);
const  UserModel = require('./models/buoi29')
const  UserRouter = require('./userRouter')

// Cách 2: dùng express.static  để public ra ngoài toàn bộ
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/testImg', express.static(path.join(__dirname, './test'))); // public file ảnh
// http://localhost:3000/testImg/01_esvt.jpg link lấy file ảnh

app.use('/user', UserRouter) // router


app.get('/home', function(req, res){ // app.get : gửi data ra ngoài , /home : đường dẫn tự đặt
    res.send("sever update thanh cong")
})

app.get('/html', function(req, res){ // sửa lại link trong html href="/css" or http://localhost:3000/css
    res.sendFile(path.join(__dirname, './view/thach-btap7.html')) //  dùng path lấy link tuyệt đối của file html css
})
app.get('/html1', function(req, res){ // sửa lại link trong html href="/css" or http://localhost:3000/css
    console.log(18, req.query); // nhận query gửi về từ đường dẫn http://localhost:3000/html1?ten=thai&age=34&que=khanh%20hoa
    console.log(18, req.query.age); // nhận query gửi về từ đường dẫn http://localhost:3000/html1?ten=thai&age=34&que=khanh%20hoa
    res.sendFile(path.join(__dirname, './view/thach-buoi5-btap2.html')) //  dùng path lấy link tuyệt đối của file html css
})


app.get('/home1', function(req, res){ // dùng với mongoosedb
    UserModel.find()
    .then(function(data){
        res.json({  status : 200, mess : 'thanh cong' , data})
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get("/html9/:id", function(req, res){ // params
    console.log(23, req.params);
    console.log(23, req.query);

    UserModel.findOne({ _id: req.params.id })
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
});



// app.get('/home9/:username', function(req, res){ // params
//     console.log(49, req.params);
//     // console.log(51, req.query);
//     UserModel.findOne({ username : req.params.username })
//     .then(function(data){
//         res.json(data)
//     })
//     .catch(function(err){
//         console.log(err);
//     })
// })

app.get('/home100', function(req, res){ // params
    console.log(63, req.params);
    console.log(64, req.query);
    // console.log(65, req.query.password);
    UserModel.find({ password : req.query.password}) // truy vấn password thì phải khái báo bên UserModel
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
})

// Cách 1 : làm từng file
// app.get('/css', function(req, res){ // tạo link css trên sever
//     res.sendFile(path.join(__dirname, './thach-btap7.css')) // dùng path lấy link tuyệt đối của file html css
// })

app.listen(3000); // cấp cho app cổng để nhận từ 3000 trở lên ( các dịch vụ  khác đã chiếm) 
// B3 . 3 Bước để tạo thành công 1 sever
// chạy sever http://localhost:3000/home
// nodemon file

//dùng query  tìm user quê HN và hiển thị lên Browser

// dùng query và params tìm user quê HN và có tuổi = 20

// dùng express.static để public thư mục test có chứa ảnh

