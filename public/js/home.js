$.ajax({
    url: '/user/danhsach',
    type : 'GET',

})
.then(data =>{ 
    console.log(data);
    let classList = []
    
    $("#chon").append(` <option value='all'> all </option> `)
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        if (classList.includes(data[i].class) === false ) {
            classList.push(data[i].class)
            const option1 = `
            <option value='${data[i].class}'> ${data[i].class} </option>
            `
            $("#chon").append(option1)
        }
        
    }
    console.log(classList);
    
    // thêm button phân trang theo đọ dài dữ liệu
    console.log(Math.ceil(data.length / 5));
    const totalPage = Math.ceil(data.length / 5)
    for (let i = 1; i <= totalPage; i++) {
        let button = ` <button onclick="page(${i})">${i} </button> `
        $('.buttonList').append(button)
    }

    // $('.data').html('') // xóa data cũ về '' để hiển thị data mới ko chồng lên data cũ

    for (let i = 0; i < 5; i++) {
        console.log(data[i]);
        const div = `<div> ${data[i].username} </div>` 
        $('.data').append(div) // chèn div vào khối hiển thị data
    }
})
.catch(err =>{console.log(7, err);})

async function page(i){ // phân chia data hiển thị theo trang
    console.log(i);
    try {
        const className = $('#chon').val()
        console.log(className);
        $('.data').html('') // xóa data cũ về '' để hiển thị data mới ko chồng lên data cũ
        const data = await $.ajax({
            url: `/user/page/${i}/${className}`, // url: '/user/page/'+i, localhost:4000/user/page/1
            type: 'GET'
        })
       
        for (let j = 0; j < data.length; j++) {// hiển thị username của data
                const div = `<div>${data[j].username}</div>` 
                $('.data').append(div) // chèn div vào khối hiển thị data
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function select1(){ // phân chia data hiển thị theo class
    try {
        const className = $('#chon').val()
        const data = await $.ajax({
            url: `/user/class/${className}`, // url: '/user/page/'+i, localhost:4000/user/page/1
            type: 'GET'
        })

        $('.buttonList').html('')
        console.log(Math.ceil(data.length / 5));
        const totalPage = Math.ceil(data.length / 5)
        for (let i = 1; i <= totalPage; i++) {
            let button = ` <button onclick="page(${i})">${i} </button> `
            $('.buttonList').append(button)
        }
        
        $('.data').html('') // xóa data cũ về '' để hiển thị data mới ko chồng lên data cũ
        for (let j = 0; j < 5; j++) {
                const div = `<div>${data[j].username}</div>` 
                $('.data').append(div) // chèn div vào khối hiển thị data
        }
        console.log(data);
        console.log(data.length);
    } catch (error) {
        console.log(error);
    }
}