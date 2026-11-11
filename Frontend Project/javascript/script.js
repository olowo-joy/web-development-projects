//Flower Array
flowers = [
    {
        image: "images/dahlia.jpg",
        name: "Dahlia",
        price: "2",
        description: "Add a burst of bold color and elegance to any room. Dahlias symbolize strength and inner grace, perfect for brightening both spaces and spirits."
    },
    {
        image: "images/hyacinth.jpg",
        name: "Hyacinth",
        price: "2",
        description: "Delight in the sweet fragrance of Hyacinths, their vibrant blooms bring spring’s joy and serenity into your home year-round."
    },
    {
        image: "images/rose.jpg",
        name: "Rose",
        price: "4",
        description: "Classic, timeless, and full of meaning, Roses say what words cannot. Express love, admiration, or friendship with nature’s most iconic flower."
    },
    {
        image: "images/lily.jpg",
        name: "Lily",
        price: "3",
        description: "Elegant and pure, Lilies radiate peace and beauty. Their gentle fragrance makes them ideal for both celebrations and quiet reflection."
    },
    {
        image: "images/carnation.jpg",
        name: "Carnation",
        price: "2.50",
        description: "Charming and cheerful, Carnations symbolize affection that lasts. Perfect for any occasion, or just to make someone smile."
    },
    {
        image: "images/chrysanthemum.jpg",
        name: "Chrysanthemum",
        price: "1.50",
        description: "Bright, bold, and full of life, Chrysanthemums celebrate optimism and joy. Bring warmth and happiness into any space with their golden hues."
    },
    {
        image: "images/daisy.jpg",
        name: "Daisy",
        price: "4",
        description: "Simple yet timeless, Daisies embody innocence and new beginnings. A cheerful bloom to freshen any bouquet or brighten your day."
    },
    {
        image: "images/iris.jpg",
        name: "Iris",
        price: "3",
        description: "Symbolizing wisdom and hope, the Iris adds a regal touch with its striking petals and deep, captivating colors."
    },
    {
        image: "images/marigold.jpg",
        name: "Marigold",
        price: "3",
        description: "Radiant and festive, Marigolds bring sunshine wherever they go. Perfect for celebrations or to add a golden glow to your home."
    },
    {
        image: "images/azalea.jpg",
        name: "Azalea",
        price: "2.50",
        description: "Graceful and vibrant, Azaleas bloom with passion and elegance, the perfect gift for those who make life beautiful."
    },
    {
        image: "images/poppy.jpg",
        name: "Poppy",
        price: "1",
        description: "Delicate yet powerful, Poppies inspire peace and remembrance. Their vivid blooms stand out as symbols of love and resilience."
    },
    {
        image: "images/hydrangea.jpg",
        name: "Hydrangea",
        price: "3",
        description: "Soft, full, and endlessly elegant, Hydrangeas express heartfelt gratitude and abundance, making every arrangement unforgettable."
    }
];


const flowerGrid = document.getElementById("flowerGrid");

//Flower Grid
function compileGrid() {
    if (!flowerGrid) return;

    flowers.forEach(flower => {
        const div = document.createElement("div");
        div.classList.add("flower-card");

        const img = document.createElement("img");
        img.src = flower.image;
        img.alt = flower.name;

        const name = document.createElement("h3");
        name.textContent = `${flower.name} | $${flower.price} ea.`;
        
        const desc = document.createElement("p");
        desc.textContent = flower.description;

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(desc);

        flowerGrid.appendChild(div);
    });
};

//Flower Dropdown
const dropdownFlowers = document.getElementById("flowerType");
function dropFlowers() {
    if (!dropdownFlowers) return;

    const placeholder = document.createElement("option");
    placeholder.textContent = '-- Select a Flower --'
    placeholder.value = "";
    dropdownFlowers.appendChild(placeholder);

    flowers.forEach(flower => {
        const opt = document.createElement("option");
        opt.value = flower.name;
        opt.textContent = flower.name; 

        dropdownFlowers.appendChild(opt); 
    });
  };

  if (dropdownFlowers) {
    dropdownFlowers.addEventListener("change", ()=> {
        const selected = dropdownFlowers.value;   
    });
  };


//Popular Flowers
const popularNames = ["Rose", "Lily","Daisy","Hydrangea"];
    function displayPopularFlowers() {
        const popularGrid = document.getElementById("popularGrid");
        if (!popularGrid) return;

        popularGrid.innerHTML = "";
        const popularFlowers = flowers.filter(flower => popularNames.includes(flower.name));
        popularFlowers.forEach(flower => {
            const div = document.createElement("div");
            div.classList.add("flower-card");

            const img = document.createElement("img");
            img.src = flower.image;
            img.alt = flower.name;

            const name = document.createElement("h3");
            name.textContent = `${flower.name} | $${flower.price} ea.`;

            const desc = document.createElement("p");
            desc.textContent = flower.description;

            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(desc);

            popularGrid.appendChild(div);
    });
  }

//Runs all the functions
window.addEventListener("DOMContentLoaded", () => {
    compileGrid();
    dropFlowers();
    displayPopularFlowers();
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// Form Validation
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      alert("Thank you! Your form has been submitted 🌸");
      form.reset();
    });
  });