

var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var productImage = document.getElementById('productImage');



var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");


var productList = [];

var updateIndex ;

if(localStorage.getItem("products") !== null){ 
    productList = JSON.parse(localStorage.getItem("products")) ;

    display(productList);
    
}

function addProduct(){
 if (productCategory.value === "" || productCategory.value === "Select Game Category") {
    alert("Please select a game category 💜");
    return;
}
if (productPrice.value === "" || Number(productPrice.value) <= 0) {
    alert("Please enter a price greater than zero 💜");
    return;
}
var product = {
 name : productName.value ,
 price : productPrice.value ,
 category : productCategory.value ,
 description: productDescription.value ,
 image : productImage.files[0].name, 

}
productList.push(product);
                      //key 
localStorage.setItem("products" , JSON.stringify(productList));
display(productList);
resetData () ;
console.log(productList)
}

function resetData (){
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDescription.value = ""
    productImage.value = ""
}

function display(targetArray){
    var cartona = "" ;
    for(var i = 0 ; i < targetArray.length ; i++){
        cartona+= ` <div class="col-sm-6 col-lg-4 col-xl-3 mt-5 cartona ">


            <div class="card">
              <div>
                <img
                  src="./image/${targetArray[i].image}"
                  class="card-img-top w-100"
                  alt="..."
                />
              </div>
              <div class="card-body">
                <h2 class="card-title">${targetArray[i].name}</h2>
                <p class="card-text">
                  ${targetArray[i].description}
                </p>
                <h4 class = "fw-medium ">Price    : ${targetArray[i].price}</h4>
                <h4 class = "fw-medium">Category : ${targetArray[i].category} </h4>
              </div>
              <div class="card-footer bg-body-secondary">
                <button class = "btn btn-warning text-light " style="background-color:#6c757d; border-color: #6c757d;" onclick = "resetAllData(${targetArray.length < productList.length ? targetArray[i].oldIndex : i})">Update</button>
                 <button class = "btn  text-light ms-3 " style="background-color: #943030;border-color: #6c757d;" onclick="deleteProduct(${targetArray.length < productList.length ? targetArray[i].oldIndex : i})" >Delete</button>
              </div>
            </div>


          </div>`
    }
    document.getElementById("rowData").innerHTML = cartona ;
}

function deleteProduct(index){
   productList.splice(index , 1);

   localStorage.setItem("products" , JSON.stringify(productList));

   display(productList);
}

function searchProduct(searchInputValue){
    var searchProduct = [] 
   var searchValue = searchInputValue.value ;

   for(var i = 0 ; i < productList.length ; i++){
     
    if(productList[i].name.toLowerCase().includes(searchValue.toLowerCase())){
    
        productList[i].oldIndex = i 
        searchProduct.push(productList[i]);

    }
   }
   display(searchProduct);

}
function resetAllData(index){

    //up all data
  updateIndex = index ;
  productName.value = productList[index].name
  productPrice.value = productList[index].price
  productCategory.value = productList[index].category
  productDescription.value = productList[index].description
  

  productImage.value = "";

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

}

function updateProduct(){

  productList[updateIndex].name = productName.value ;
  productList[updateIndex].price = productPrice.value ;
  productList[updateIndex].category = productCategory.value ;
  productList[updateIndex].description= productDescription.value ;


  if(productImage .files.length > 0){
    productList[updateIndex].image = productImage.files[0].name;  
   }

  localStorage.setItem("products" , JSON.stringify(productList));
  
  resetData();

  display(productList);

  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");

}