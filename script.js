const button = document.getElementById('searchBtn');
const meal = document.getElementById('meal');
const showResult = document.getElementById('show-result');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const user = document.getElementById('inputForSearch').value;
    loadData(user);
});

function loadData(user) {
    let url = "";
    if (user.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${user}`;
        meal.innerHTML = null;
        showResult.innerHTML = null;

    }
    else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${user}`;
        meal.innerHTML = null;
        showResult.innerHTML = null;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        })
}


const displayData = data => {

    data.meals.forEach(element => {

        const div = document.createElement('div');

        const mealInit = `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${element.strMealThumb}"/>
                <div class="card-body">
                    <h5 class="card-title mx-auto">${element.strMeal}</h5>
                    <button onclick="displayMealInfo('${element.strMeal}')">Details</button>
                </div>
            </div>
        </div> `;
        div.innerHTML = mealInit;
        meal.appendChild(div);

    });
}

const displayMealInfo = (string) => {

    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            showResult.style.display = "block"
            const div = document.createElement('div');

            let element;
            let mealInfo;
            for (let i = 0; i < data.meals.length; i++) {
                element = data.meals[i];

                if (string === element.strMeal) {
                    mealInfo = `
                    <img src="${element.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h3 class="card-title">${element.strMeal}</h3>
                    <p>Ingredients</p>
                    <ul>                    
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        
                    </ul>
                    </div> `;
                }
            }

            div.innerHTML = mealInfo;
            showResult.appendChild(div);
        });
    showResult.innerHTML = null;
}