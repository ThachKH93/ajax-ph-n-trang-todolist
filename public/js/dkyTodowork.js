function render(){
    var html = ''
    $.ajax({
        url: 'http://localhost:4000/todolist/abc', // đường dẫn 
        type: 'GET' // gọi GET
    })
    .then(data => { // dùng jquery hiển thị data trong html trên sever
        console.log(data);
        for (let i = 0; i < data.length; i++) { // lấy dữ liệu data dạng array object
             html = `
            <div>
                ${data[i].work} : ${data[i].dealine ? data[i].dealine : ' chua cung cap '} 
                ${data[i].class ? data[i].class : ' chua cung cap '}
            </div>
            `
            $('body').append(html) // hiển thị trên body html
        }
    
    })
    .catch(err => {console.log(err);})
}
render();

console.log(1000); // test thử trong http://localhost:4000/dangky đã nhận file dangky.js chưa
async function create(){
    try {
        var work1 =  document.querySelector('#work').value
        var dealine1 = document.querySelector('#dealine').value
        console.log(work1);
        console.log(dealine1);
        var user = await $.ajax({
        url: 'http://localhost:4000/todolist/create1',
        type: 'POST',
        data: {
            work: work1,
            dealine: dealine1
            }
        })
        console.log(user);
        // alert(`${mess}`)
        // render();
    } catch (error) {
        console.log(error);
    }
}

async function update(){ // sửa dealine trên htmlL
    try {
        var work1 =  document.querySelector('#work').value
        var dealine1 = document.querySelector('#dealine').value
        console.log(work1);
        console.log(dealine1);
        var user = await $.ajax({
        url: 'http://localhost:4000/todolist/up',
        type: 'PUT',
        data: {
            work: work1,
            dealine: dealine1
            }
        })
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}