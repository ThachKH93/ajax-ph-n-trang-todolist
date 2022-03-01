const express = require('express')
const router = express.Router()
const path = require("path") // dùng path lấy link tuyệt đối

const UserModel120 = require('./bangtodolist')

router.post("/create", function(req, res){ // api thêm
    UserModel120.findOne({ work: req.query.work })
    .then(function(data){
        if (data) {
            res.json({ mess : 'work đã tồn tại' })
        }else{
            UserModel120.create({
                work : req.query.work,
                dealine : req.query.dealine,
            })
            .then(function(data){
                res.json(data)
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

router.get("/danhsach", function(req, res){ // xem
    UserModel120.find()
    .populate('class')
    .then(function(data){
        res.json(data)
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    })
});
router.get("/danhsach/:id", function(req, res){ // xem theo id
    UserModel120.findOne({ _id: req.params.id })
    .populate('class')
    .then(function(data){
        res.json(data)
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    })
});

router.delete("/xoatodolist/:id", function(req, res){ // xóa theo id params
    UserModel120.deleteOne({ _id: req.params.id })
    .then( data => {res.json(data)})
    .catch( err => {console.log(err)})
});

router.get("/danhsachclass/:id", (req, res) => { // xem theo id
    UserModel120.find({ class: req.params.id })
    .populate('class')
    .then((data) => { // JS array funtion
        res.json(data)
        // console.log(data);
    })
    .catch( err => { // JS array funtion : (err) =>  như function(err)
        console.log(err)})
});
//http://localhost:4000/todolist/danhsachclass/61d5ccbe67e3ae80e70f9449

router.get('/', async function(req, res){ // async - await xử lý promise
    var list = await UserModel120.find() // var const
    .populate('class')
    res.json(list)
})

router.get('/abc', async function(req, res){ // async - await xử lý promise
    try{ // trả về kết quả của .then
        const list = await UserModel120.find() // var const
        .populate('class')
        res.json(list)
    } catch(err1){ // bắt lỗi , trả về kết quả của .catch
        res.json({mess : 'loi sever',data : err1})
    }
})

router.post("/create1",async function(req, res){ // api thêm
    try{
        console.log(req.body);
        const neW = await UserModel120.findOne({ work: req.body.work })
        if (neW) {
            res.json({ mess : 'work đã tồn tại' })
        }else{
            const n1 = await UserModel120.create({
                work : req.body.work,
                dealine : req.body.dealine,
            })
            res.json({ data: n1, mess : 'tạo work thành công' })
        }
        console.log(req.body.mess);
    }
    catch(err1){
        res.json({mess : 'loi sever',data : err1})
    }
});

router.put("/up", (req, res) => { // sửa dealine trên htmlL
    UserModel100.updateOne({ _id: req.body.id }, { dealine : req.body.dealine })
    .then((data) => { res.json(data) })
    .catch( err => { console.log(err)})
});

module.exports = router

// JS array funtion : (err) =>  như function(err)
// hoặc err => với 1 tham số ( có thể bỏ ngoặc)
//.catch( err => { console.log(err)}) : .catch(tham số đầu vào => { thực thi })
// (req, res) => với 2 tham số đầu vào  trở lên

// async - await xử lý promise
// async function(req, res) dùng async thì mới dùng await được
// await đợi kết quả trả về của UserModel120.find()
// const list = await UserModel120.find()

// try {} catch{} như nhau với .then .catch
