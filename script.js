var carsList = document.getElementsByClassName("carsList")[0]
var cars

function getJsonCars() {
    fetch("./cars.json")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cars = data.cars
            getCarsAndDisplay(cars)
        })
}

function appendList() {
    getJsonCars()
}

function getCarsAndDisplay(params) {
    params.forEach(element => {
        displaySingleCar(element)
    })
}

function displaySingleCar(car) {
    let newCarElement = `<tr>
        <td> ` + car.car_name + ` </td>
        <td class="sort_price"> ` + car.price + ` </td>
        <td> ` + car.discount + ` </td>
        <td> ` + car.hand + ` </td>
        <td> ` + car.availability + ` </td>
        <td class="sort_color"> ` + car.color + ` </td>
    </tr>`

    carsList.innerHTML += newCarElement
}

function sortCars() {
    let option = document.getElementById("sort_options").value
    if (option === "1") {
        let sortedCars = cars.sort((a, b) => { return a.color > b.color ? 1 : -1 })
        carsList.innerHTML = ""
        getCarsAndDisplay(sortedCars)
        showSortingOption("sort_color")
    } else if (option === "2") {
        $.ajax({
            type: "GET",
            url: './script.php',
            data: {
                sort_options: "2"
            },
            success: function(response) {
                let sortedCars = JSON.parse(response)
                carsList.innerHTML = ""
                for (let i = 0; i < sortedCars.length; i++) {
                    displaySingleCar(sortedCars[i])
                }
                showSortingOption("sort_price")
            }
        })
    } else {
        carsList.innerHTML = ""
        appendList()
        showSortingOption("no sorting")
    }
}

function showSortingOption(className) {
    let sort_price = document.getElementsByClassName("sort_price")
    let sort_color = document.getElementsByClassName("sort_color")
    if (className === "sort_price") {
        for (let i = 0; i < sort_price.length; i++) {
            sort_price[i].setAttribute("id", "sorting")
            sort_color[i].setAttribute("id", "")
        }
    } else if (className === "sort_color") {
        for (let i = 0; i < sort_color.length; i++) {
            sort_color[i].setAttribute("id", "sorting")
            sort_price[i].setAttribute("id", "")
        }
    } else {
        for (let i = 0; i < sort_color.length; i++) {
            sort_color[i].setAttribute("id", "")
            sort_price[i].setAttribute("id", "")
        }
    }
}