const express = require('express')
const router = express.Router()

const UserModel100 = require('./banguser')

const checkLogin = require('./checkLogin')


//type GET ko có body
// GET gửi data thông qua query, param

router.post("/create", function(req, res){ // api post
    // UserModel100.findOne({ username: req.query.username })
    UserModel100.findOne({ username: req.body.username })
    .then(function(data){
        if (data) {
            res.json({ mess : 'Username đã tồn tại' })
        }else{
            UserModel100.create({
                username : req.body.username,
                password : req.body.password,
            })
            .then(function(data){
                res.json({data, mess : 'Đăng ký thành công' })
            })
            .catch(function(err){
                console.log(err);
            })
        }
    })
    .catch(function(err){
        console.log(err);
    })
});

router.get("/danhsach", checkLogin, function(req, res){ // express lấy file HTML
    console.log(111,req.headers); // lấy id từ headers cửa cookie để kiểm tra đăng nhập
    console.log(112,req.headers.cookie); // lấy  cookie về dạng string
    // console.log(113,req.headers.cookie.split(';')[1].split('=')[1]); // Cách 1 : lấy id từ dạng string của headers
    // Cách 2 : dùng cookie-parser để lấy id nhanh hơn
    // B1 npm i cookie-parser : tải gói cookie-parser về
    // B2 const cookieParser = require('cookie-parser') : require cookie-parser vào file thachapp.js
    // B3 app.use(cookieParser()) trong file thachapp.js
    console.log(42, req.cookies);
    console.log(43, req.cookies.userID);
    UserModel100.find()
    .then(function(data){
        res.json( data)
    })
    .catch(function(err){
        console.log(err);
    })
});
router.get("/danhsach/:id", function(req, res){ // express lấy file HTML
    UserModel100.findOne({ _id: req.params.id })
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
});
// viet API de sua password
router.put("/doimatkhau/:id", function(req, res){ // express lấy file HTML
    // UserModel100.updateOne({ _id: req.query.id }, { password: req.query.password })
    //tìm kiếm theo id và username , password cũ
    // console.log(67,req.headers.cookie);
    // console.log(68, req.cookies);
    // console.log(69, req.cookies.userID);
    UserModel100.updateOne({ _id: req.params.id , username: req.body.username , password: req.body.password }, 
    // UserModel100.updateOne({ _id: req.cookies.userID , username: req.body.username , password: req.body.password }, 
        { password: req.body.Newpassword })
    .then(function(data){
        if (data.modifiedCount) {
            res.json({mess: 'update thanh cong', data})
        }else{
            res.json({mess: 'sai username, password hoac password khong doi'})
        }
        
    })
    .catch(function(err){
        console.log(err);
        res.json(error)
    })
});
router.put("/doimatkhau",checkLogin, function(req, res){ // express lấy file HTML
    // UserModel100.updateOne({ _id: req.query.id }, { password: req.query.password })
    //tìm kiếm theo id và username , password cũ
    console.log(67,req.headers.cookie);
    console.log(68, req.cookies);
    console.log(69, req.cookies.userID);
    UserModel100.updateOne({_id: req.cookies.userID , username: req.body.username , password: req.body.password }, 
    // UserModel100.updateOne({ _id: req.cookies.userID , username: req.body.username , password: req.body.password }, 
        { password: req.body.Newpassword })
    .then(function(data){
        if (data.modifiedCount) {
            res.json({mess: 'update thanh cong', data})
        }else{
            res.json({mess: 'sai username, password hoac password khong doi'})
        }
        
    })
    .catch(function(err){
        console.log(err);
        res.json(error)
    })
});
router.delete("/xoauser", function(req, res){ // express lấy file HTML
    UserModel100.deleteOne({ _id: req.query.id })
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
});

router.get('/page/:page/:class', async (req, res) =>{
    try {
        console.log(req.params);
        if (req.params.class === 'all') {
            const data = await UserModel100.find()
            .skip(5 * (req.params.page - 1) )
            .limit(5)
            res.json(data)
            // console.log(data);
        }else{
            const data =  await UserModel100.find({class: req.params.class})
            .skip(5 * (req.params.page - 1) )
            .limit(5)
            res.json(data)
        }
    } catch (error) {
        res.json({mess: 'loi sever', error})
    }
})

router.get('/class/:class', async (req, res) =>{
    try {
        console.log(req.params);
        if (req.params.class === 'all') {
            const data = await UserModel100.find()
            res.json(data)
        }else{
            const data =  await UserModel100.find({class: req.params.class})
            res.json(data)
        }
    } catch (error) {
        res.json({mess: 'loi sever', error})
    }
})

router.post('/login', async (req, res) =>{
    try {
        // console.log(req.body);
        const user = await UserModel100.findOne({username : req.body.username, password: req.body.password})
        if (user) {
            res.json({user, mess:'thanh cong'})
        }else{
            res.json({mess:'user ko ton tai'})
        }
    } catch (error) {
        res.json({error ,mess:'loi sever'});
    }
})








module.exports = router