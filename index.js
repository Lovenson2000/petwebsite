const url = "https://learnwebcode.github.io/pet-adoption-data/pets.json";

const response = await fetch(url);
const data = await response.json();
console.log(data);

const template = document.querySelector("#animal-card");
const wrapper = document.createElement("div");

function decideAgeText(age) {

    if(!age) {
        return "Less than a year old";
    }
    return age > 1 ? `${age} years old`: "1 year old";

}

data.forEach(pet => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = pet.name;

    const img = clone.querySelector("img");
    img.src = pet.photo;
    img.alt = `A ${pet.species} named ${pet.name}`;

    const age = new Date().getFullYear() - pet.birthYear;
    const ageText = decideAgeText(age);
    clone.querySelector(".age").textContent = ageText;

    clone.querySelector(".species").textContent = pet.species;

    clone.querySelector(".name").textContent = pet.name;

    clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}`;

    clone.querySelector(".description").textContent = pet.description;
 



    wrapper.appendChild(clone);
})

document.querySelector(".animals").appendChild(wrapper);

const filterButton = document.querySelectorAll(".filter-nav a");
console.log(filterButton);

filterButton.forEach(element => {
    element.addEventListener("click", e => handleClickFilter(e))
})

function handleClickFilter(e) {
    let target = e.target;
    e.preventDefault();
    filterButton.forEach(element => {
        element.classList.remove("active");
    })
    target.classList.add("active");

    filterPets(target.dataset.filter);
}

function filterPets(species) {
    const allPets = document.querySelectorAll(".animal-card");

    if(species == "all") {
        allPets.forEach(element => {
            element.style.display = "";
        })

    } else {
        allPets.forEach(element => {
            if(element.querySelector(".species").textContent == species) {
                element.style.display = "";

            } else {
                element.style.display = "none";

            }
        })

    }

}


