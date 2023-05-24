const socket = io();

const inputTitle = document.getElementById("form-title");
const inputThumb = document.getElementById("form-thumbnail")
const inputDesc = document.getElementById("form-description");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputCat = document.getElementById("form-category");
const inputPrice = document.getElementById("form-price");

const ProdForm = document.getElementById("prodForm")

const inputId = document.getElementById("form-idProd");
const delProdForm = document.getElementById("form-btn-del");


ProdForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newProd = {
        title: inputTitle.value,
        thumbnail: inputThumb.value,
        description: inputDesc.value,
        code: inputCode.value,
        stock: inputStock.value,
        category: inputCat.value,
        price: inputPrice.value
    }
    socket.emit("new-product", newProd)
})

socket.on("products", ({promiseProducts})=>{
    console.log(promiseProducts)
    document.getElementById("dinamicProd").innerHTML = promiseProducts.reduce((acc,item)=>{
        return acc + "<p>" + JSON.stringify(item) + "</p>"
    })
})
// front envia msg al back
// setInterval(()=> {
//     socket.emit('msg_front_back', {
//         msg: 'hola mundo desde front',
//         user: 'usuario anonimo'
//     })
// },1000)

// front ataja msg del back
socket.on('msg_back_front', (msg)=>{
    console.log(msg)
})