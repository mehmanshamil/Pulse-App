let product = document.getElementById("product")
let src = document.getElementById("src")
let inp = document.getElementById("inp")
let max = document.getElementById("max")
let min = document.getElementById("min")
let abc = document.getElementById("abc")
let cba = document.getElementById("cba")
let dflt = document.getElementById("dflt")
let loadbtn = document.getElementById("loadbtn")
let page = 1;
let limit = 4;
loadbtn.addEventListener("click", getData)
src.addEventListener("submit", srcFunc)
max.addEventListener("click", maxFunc)
min.addEventListener("click", minFunc)
abc.addEventListener("click", abcFunc)
cba.addEventListener("click", cbaFunc)
dflt.addEventListener("click", () => {
    product.innerHTML = ''
    getData()
})

async function maxFunc() {
    product.innerHTML = ""
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            let data = db.sort((a, b) => b.price - a.price)
            display(data)
        })
        .catch((err) => console.log(err))
}

async function minFunc() {
    product.innerHTML = ""
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            let data = db.sort((a, b) => a.price - b.price)
            display(data)
        })
        .catch((err) => console.log(err))
}

async function abcFunc() {
    product.innerHTML = ""
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            let data = db.sort((a, b) => a.title.localeCompare(b.title))
            display(data)
        })
        .catch((err) => console.log(err))
}
async function cbaFunc() {
    product.innerHTML = ""
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            let data = db.sort((a, b) => b.title.localeCompare(a.title))
            display(data)
        })
        .catch((err) => console.log(err))
}


async function srcFunc(e) {
    e.preventDefault()
    product.innerHTML = ''
    axios.get()
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            let data = db.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()))
            display(data)
        })
        .catch((err) => console.log(err))
}

async function getData() {
    await axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/product?page=${page}&limit=${limit}`)
        .then((res) => {
            data = res.data
            display(data)
            page++
        })
        .catch((err) => console.log(err))
}

getData()
function display(data) {
    data.forEach((item) => {
        let div = document.createElement("div")
        div.className = "box"
        div.innerHTML = `
        <i id="wish" onclick="addWish(${item.id})" class="fa-solid fa-heart"></i>
        <img src="${item.image}" alt="">
        <p>${item.title}</p>
        <h6>${item.price} $</h6>
        <button onclick="addToCart(${item.id})"><i class="fa-solid mx-2 fa-cart-shopping"></i>Add to cart</button>
        `
        product.appendChild(div)
    })
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(data.find(item => item.id == id))
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(cart);
}
function addWish(id) {
    let wish = JSON.parse(localStorage.getItem("wish")) || []
    wish.push(data.find(item => item.id == id))
    localStorage.setItem("wish", JSON.stringify(wish))
    console.log(wish);
}