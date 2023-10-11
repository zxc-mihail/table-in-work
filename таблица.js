function addRow() {

    var table = document.getElementById("calorieTable");

    for (let node of document.querySelectorAll('input[class="gramsInput"]')){
        var flag = false
        if (node.value == ''){
            node.parentNode.parentNode.children[0].style.background = 'rgb(255, 193, 193)'
            node.parentNode.parentNode.children[0].children[0].style.background = 'rgb(255, 193, 193)'
            node.parentNode.style.background = 'rgb(255, 193, 193)'
            node.style.background = 'rgb(255, 193, 193)'
            flag = true
        }else{
            node.parentNode.parentNode.children[0].style.background = 'white'
            node.parentNode.parentNode.children[0].children[0].style.background = 'white'
            node.parentNode.style.background = 'white'
            node.style.background = 'white'
        }
    }
    if (flag == true){
        // alert('Заполните все предыдущие поля');
        flag = false; 
        return
    }

    var row = table.insertRow(-1);
    var productCell = row.insertCell(0);
    var gramsCell = row.insertCell(1);
    var caloriesCell = row.insertCell(2);
    var proteinCell = row.insertCell(3);
    var fatsCell = row.insertCell(4);
    var carbohydratesCell = row.insertCell(5);
    var devareCell = row.insertCell(6);

            // productCell.innerHTML = '<input type="text">';
    productCell.innerHTML = `<select class="productSelect">
        <option value=''disabled selected>Выберете продукт</option> 
            <optgroup label="Мясо">
                <option>Курица</option>
                <option>Говядина</option>
            </optgroup><optgroup label="Овощи">
                <option>Огурец</option>
            </optgroup></select>`;
    gramsCell.innerHTML = `<input type="number" class="gramsInput" 
                            placeholder="Введите его массу">`;
    
    // caloriesCell.innerHTML = '<input type="text" readonly>';
    devareCell.innerHTML = '<button onclick="deleteRow(this)">Удалить</button>';

    addingListener()
}


function calculateAll(input){
    calculateCalories(input)
    calculateProtein(input)
    calculateCarbohydrates(input)
    calculateFats(input)
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function clearTable(){
    var table = document.getElementById("calorieTable");

    table.children[2].innerHTML = `<tr>
    <td>
        <select class="productSelect">

            <option value='' disabled selected>Выберете продукт</option>
            <optgroup label="Мясо">
                <option>Курица</option>
                <option>Говядина</option>
            </optgroup>

            <optgroup label="Овощи">
                <option>Огурец</option>
            </optgroup>
    
        </select>
    </td>
    <td><input type="number" class="gramsInput" placeholder="Введите его массу"></td>
    <!-- <td><input type="text" id="caloriesInput" readonly></td> -->
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><button onclick="deleteRow(this)">Удалить</button></td>
</tr>`

addingListener()
}

function addingListener(){
    var gramsInputs = document.querySelectorAll('input[class="gramsInput"]');
    for (var i = 0; i < gramsInputs.length; i++) {
        gramsInputs[i].addEventListener('input', function() {
            calculateCalories(this);
            calculateProtein(this);
            calculateFats(this);
            calculateCarbohydrates(this);
        });
    }


    var selects = document.querySelectorAll('select[class="productSelect"]');
    for (var i = 0; i < selects.length; i++){
        selects[i].addEventListener('change', function(){
            calculateAll(this.parentNode.nextElementSibling.children[0]);
        })
    }
}

function calculateCalories(input) {
    var grams = input.value;
    var caloriesCell = input.parentNode.nextElementSibling;
    var product = input.parentNode.previousElementSibling.children[0].value

    if (getCalories(product) == false){input.value = ''; return}

    var calories = grams * getCalories(product); // Здесь нужно добавить логику расчета калорий для каждого продукта
    caloriesCell.innerHTML = `<p>${calories}</p>`
}

function calculateProtein(input) {
    var grams = input.value;
    var proteinCell = input.parentNode.nextElementSibling.nextElementSibling;
    var product = input.parentNode.previousElementSibling.children[0].value

    if (getProtein(product) == false){return}

    var protein = grams * getProtein(product); // Здесь нужно добавить логику расчета калорий для каждого продукта
    proteinCell.innerHTML = `<p>${protein}</p>`
}


function calculateFats(input) {
    var grams = input.value;
    var fatsCell = input.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;
    var product = input.parentNode.previousElementSibling.children[0].value

    if (getFats(product) == false){return}

    var fats = grams * getFats(product); // Здесь нужно добавить логику расчета калорий для каждого продукта
    fatsCell.innerHTML = `<p>${fats}</p>`
}


function calculateCarbohydrates(input) {
    var grams = input.value;
    var carbohydratesCell = input.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    var product = input.parentNode.previousElementSibling.children[0].value

    if (getCarbohydrates(product) == false){return}

    var carbohydrates = grams * getCarbohydrates(product); // Здесь нужно добавить логику расчета калорий для каждого продукта
    carbohydratesCell.innerHTML = `<p>${carbohydrates}</p>`
}

// var gramsInputs = document.querySelectorAll('input[type="number"]');
// for (var i = 0; i < gramsInputs.length; i++) {
//     gramsInputs[i].addEventListener('input', function() {
//         calculateCalories(this);
//         calculateProtein(this);
//         calculateFats(this);
//         calculateCarbohydrates(this);
//     });
// }

document.querySelector('input[class="gramsInput"]').addEventListener('input', function() {
    calculateCalories(this);
    calculateProtein(this);
    calculateFats(this);
    calculateCarbohydrates(this);
});

document.querySelector('select[class="productSelect"]').addEventListener('change', function(){
            calculateAll(this.parentNode.nextElementSibling.children[0]);
        })
    

function getCalories(product){ //дописать switch
    if (product == ''){
        alert('Вы не выбрали продукт')
        return false
    }
    switch (product.toLowerCase()){
    case 'курица':
        return 0.5
    case 'говядина':
        return 1

}
}

function getProtein(product){ //дописать switch
    if (product == ''){
        return false
    }
    switch (product.toLowerCase()){
    case 'курица':
        return 1
    case 'говядина':
        return 2

}
}


function getFats(product){ //дописать switch
    if (product == ''){
        return false
    }
    switch (product.toLowerCase()){
    case 'курица':
        return 2
    case 'говядина':
        return 4

}
}

function getCarbohydrates(product){ //дописать switch
    if (product == ''){
        return false
    }
    switch (product.toLowerCase()){
    case 'курица':
        return 10
    case 'говядина':
        return 20
}
}