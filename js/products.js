let tutus = [];
let min = undefined
let max = undefined
let currentSortCriteria = undefined
let currentProductArray = undefined
const ORDER_ASC_BY_COST = "+$";
const ORDER_DESC_BY_COST = "-$";
const ORDER_DESC_BY_REL = "vendidos"

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_REL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function showProductList() {
    let htmlContentToAppend = "";

    for (let i = 0; i < tutus_prod.length; i++) {
        let auto = tutus_prod[i];
        auto.cost = parseInt(auto.cost)


        if ((min == undefined && max == undefined) || (auto.cost >= min && auto.cost <= max) ||
            (auto.cost >= min && max == undefined) || (auto.cost <= max && min == undefined)) {

            htmlContentToAppend += `
        <div class=" articulos list-group-item list-group-item-action" onclick="product_ID(${auto.id})"  role="button">
            <div class="row">
                <div class="col-3">
                    <img src ="` + auto.image + `" alt="product image" class="img-thumbnail">
                </div>  
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ auto.name + " - " + auto.currency + " " + auto.cost + `</h4> 
                        <p> `+ auto.description + `</p> 
                        </div>
                        <small class="text-muted">` + auto.soldCount + ` vendidos</small> 
                    </div>
        
                </div>
            </div>
        </div>
        `
        }
    }

    document.getElementById("a1").innerHTML = htmlContentToAppend;
}

function product_ID(id) {
    localStorage.setItem("catIDp", id);
    window.location.href = "product-info.html"
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            tutus = resultObj.data
            tutus_prod = tutus.products
            showProductList()
        }
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        if (document.getElementById("rangeFilterCountMin").value != "") {
            min = parseInt(document.getElementById("rangeFilterCountMin").value)

        } else {
            min = undefined
        }

        if (document.getElementById("rangeFilterCountMax").value != "") {
            max = parseInt(document.getElementById("rangeFilterCountMax").value)
        } else {
            max = undefined
        }
        showProductList()
    })

});

document.getElementById("clearRangeFilter").addEventListener("click", function (a) {
    max = undefined
    min = undefined
    document.getElementById("rangeFilterCountMax").value = ""
    document.getElementById("rangeFilterCountMin").value = ""
    showProductList()
})


document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_COST);

});

document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_COST);
});


document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_REL);
});

function sortAndShowCategories(sortCriteria) {
    currentSortCriteria = sortCriteria;



    tutus_prod = sortCategories(currentSortCriteria, tutus_prod);



    showProductList();
}


document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        document.querySelector
    }



})

document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        document.querySelectorAll(".articulos").forEach(articulo => {
            articulo.textContent.toLowerCase().includes(e.target.value)
                ? articulo.classList.remove("filtro")
                : articulo.classList.add("filtro")
        });
    }
})