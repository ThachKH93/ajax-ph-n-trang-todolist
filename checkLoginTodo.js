// middleWare  : những bước trung gian cần hoàn thành để  có thể làm chức năng tiếp theo
// middleWare      -    checkLogin
// tạo hàm kiểm tra id khi di chuyển cilent
// req yêu cầu từ giao diện gửi lên sever
// res data từ sever trả về giao diện
// next chuyển sang bước tiếp theo

const UserModel150 = require('./banguser')

async function checkLogin (req, res, next) {
    try {
        console.log(39, req.cookies.userID);
        if (req.cookies.userID) { // kiểm tra id khi load lại trang /home
            const user = await UserModel150.findOne({_id: req.cookies.userID})
            if (user) {
                next()
            } else {
                res.redirect('/login')
            }
            
        }else{
            res.redirect('/login') // chuyển sang trang /login khi sai id , sever chuyển trang của cilent
        }
    } catch (error) {
        res.redirect('/login')
    }
}

module.exports = checkLogin