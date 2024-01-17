let product = document.getElementById("product")
let detail = document.getElementById("detail")
let form = document.getElementById("form")
let inp = document.getElementById("inp")
let productName = document.getElementById("productName")
let price = document.getElementById("price")
let image = document.getElementById("image")
let addedForm = document.getElementById("addedForm")
addedForm.addEventListener("submit", productAdd)
form.addEventListener("submit", srcFunc)

function productAdd(e) {
    e.preventDefault()
    let data = {
        title: productName.value,
        price: price.value,
        image: image.value
    }
    axios.post("https://6589aaa6324d4171525951a6.mockapi.io/user/product", data)
        .then(() => {
            addedForm.reset(),
                getProducts()
        })
}

async function getProducts() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let data = res.data
            display(data)
        })
        .catch((err) => console.log(err))
}

getProducts()

async function rmvToCart(id) {
    try {
        await axios.delete(`https://6589aaa6324d4171525951a6.mockapi.io/user/product/${id}`)
            .then(() => {
                getProducts()
            })
    }
    catch (error) {
        console.log(error);
    }
}
async function srcFunc(e) {
    e.preventDefault()
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            let data = db.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()))
            display(data)
        })
        .catch((err) => console.log(err))

}
function display(data) {
    product.innerHTML = ''
    data.forEach((item) => {
        let div = document.createElement("div")
        div.className = "box"
        div.innerHTML = `
    <img src="${item.image}" alt="">
    <p>${item.title}</p>
    <h6>${item.price} $</h6>
    <div class="buttons">
    <button class="save" onclick="changeInfo(${item.id})"><i class="fa-solid mx-2 fa-repeat"></i>Save</button>
    <button class="delete" onclick="rmvToCart(${item.id})"><i class="fa-solid mx-2 fa-trash"></i> Remove to cart</button> 
    </div>
    `
        product.appendChild(div)
    })
}

async function changeInfo(id) {
    try {
        detail.innerHTML = ""
        detail.style.display = "flex"
        await axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/product/${id}`)
            .then((res) => {
                db = res.data
                detail.innerHTML = `
            <i id="close" onclick="closedDetail()" class="fa-solid fa-xmark"></i>
            <h6>Image</h6>
            <img src="${db.image}" alt="product">
            <input id="newImage" type="text" value="${db.image}">
            <h6>Product title</h6>
            <input id="newTitle" type="text" value="${db.title}">
            <h6>Product price</h6>
            <input id="newPrice" type="text" value="${db.price}">
            <button class="save" onclick="saveFunc(${db.id})">Save</button>
            `
            })
    }
    catch (error) {
        console.log(error);
    }
}
function closedDetail() {
    detail.style.display = "none"

}
async function saveFunc(id) {
    try {
        let newImage = document.getElementById("newImage")
        let newTitle = document.getElementById("newTitle")
        let newPrice = document.getElementById("newPrice")
        let data = {
            title: newTitle.value,
            price: newPrice.value,
            image: newImage.value

        }
        await axios.put(`https://6589aaa6324d4171525951a6.mockapi.io/user/product/${id}`, data)
            .then(() => {
                getProducts()
                closedDetail()
            })
    }
    catch (error) {
        console.log(error)
    }
}