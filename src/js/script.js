


const baseURL = "https://api.escuelajs.co/api/v1";
let wrapper = document.querySelector('.wrapper');

function getProducts(){
    fetch(`${baseURL}/products`)
    .then((res) => res.json())
    .then((result) => renderData(result))
    .catch(arr => console.log('error', arr))
    .finally(() => console.info('success'))
}


getProducts()



function fetchingCategories(){
    fetch(`${baseURL}/categories`)
    .then((res) => res.json())
    .then((result) => getCategory(result))
    .catch(arr => console.log('error', arr))
    .finally(() => console.info('success'))
}

fetchingCategories()


function fetchingSearch(title_card){
    fetch(`${baseURL}/products/?title=${title_card}`)
    .then((res) => res.json())
    .then((result) =>  renderData(result))
    .catch(arr => console.log('error', arr))
    .finally(() => console.info('success'))
}

function fetchingCategoryByID(id){
    fetch(`${baseURL}/categories/${id}/products`)
    .then((res) => res.json())
    .then((result) =>  renderData(result))
    .catch(arr => console.log('error', arr))
    .finally(() => console.info('success'))
}

//////// Render data ///////

function renderData(data) {
    wrapper.innerHTML = "";

    if (data.length) {

        data.forEach((e) => {

            const div = createElement('div', 'w-[307px] h-[480px] bg-white rounded-[20px] border-slate-200 border-2 overflow-hidden hover:shadow-xl cursor-pointer', `
                
                <img title="Image" src="${e.images[0]}" alt="picture">
               
                <div class="p-4">
                    <h3 class="text-center font-bold text-[18px] mb-2">${e.title}</h3> 
                    <p class="mb-2"> <strong>Category: </strong>  ${e.category.name}</p>
                    <p class="text-[16px] font-medium text-justify">${e.description.substring(0,80)}...</p>
                </div>
            `)
            div.dataset.product = e.id;
            wrapper.append(div);
        })
    }
}



/////////// Search products

$("#search_products").addEventListener('keyup', (e) => {
    let value = e.target.value.toLowerCase();
    fetchingSearch(value)
})



////////// Get category

function getCategory(data) {
    data.sort().forEach((el) => {
        let option = createElement('option', 'item', el.name);
        option.value = el.id;
        $("#category").append(option)
    })
}


$("#category").addEventListener('change', (e) => {
    let value = e.target.value;
    fetchingCategoryByID(+value)
})











