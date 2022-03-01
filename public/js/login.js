console.log(1000);
async function login(){
    try {
        const username = $('#username').val()
        const password = $('#password').val()
        console.log(username, password);
        const res = await $.ajax({
            url: '/user/login', 
            type: 'POST',
            data:{username : username, password: password}
        })
        // console.log(res);
        // console.log(res.user._id);
        if (res.user._id) { // nếu id tồn tại trong database thì ép vào cookie
            setCookie('userID', res.user._id, 30) // tên , id , thời gian tồn tại 30 ngày
            window.location.href = '/home' // link di chuyển trang , sửa đường dẫn http://localhost:4000/login sang http://localhost:4000/home
            // cilent chuyển trang
        }
    } catch (error) {
        console.log(error);
        alert('sai user, passs')
    }
}

//luu data tren cookie cua trinh duyet
// link setcookie https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) { //setCookie(cname : ten_user, cvalue : gia tri id, exdays : thời hạn tồn tại)
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
