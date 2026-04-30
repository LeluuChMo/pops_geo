// 1. პროექტის კონფიგურაცია
const PROJECT_ID = '156rdx1d'; 
const DATASET = "production";

// 2. გვერდის ჩატვირთვისას გასაშვები ფუნქციები
document.addEventListener("DOMContentLoaded", () => {
    
    // ბურგერ მენიუს ლოგიკა
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            nav.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });
    }

    // Sanity-დან პროდუქტების წამოღება
    loadProducts();

    // სკროლერის (ისრების) გააქტიურება
    setupSlider();
});

// 3. მთავარი ფუნქცია: Sanity-დან მონაცემების წამოღება და ჩასმა
async function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    // ვეუბნებით Sanity-ს, რომ წამოიღოს სახელი, ფასი, სტატუსი და სურათი
    const QUERY = encodeURIComponent('*[_type == "product"]{title, price, isStock, volume, "imageUrl": image.asset->url}');
    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.result && data.result.length > 0) {
            // HTML-ის აწყობა Sanity-ს მონაცემებით
            const sanityProductsHtml = data.result.map(product => {
                const stockClass = product.isStock !== false ? 'in-stock' : 'out-of-stock';
                const stockText = product.isStock !== false ? 'მარაგშია' : 'არ არის მარაგში';

                return `
                    <div class="product-card ${stockClass}">
                        <img src="${product.imageUrl || 'productpics/placeholder.jpg'}" alt="${product.title}">
                        <span class="stock">${stockText}</span>
                        <h3>${product.title}</h3>
                        <p>მოცულობა: ${product.volume || '10მლ'}</p>
                        <span class="price">₾${product.price}</span>
                        <a href="https://wa.me/995568905673?text=გამარჯობა,%20მინდა%20შევიძინო%20პოპერსი:%20${encodeURIComponent(product.title)}" 
                           target="_blank" 
                           class="buy-btn">
                           შეძენა
                        </a>
                    </div>
                `;
            }).join('');

            // თუ გინდა ძველი პროდუქტებიც დარჩეს, გამოიყენე +=
            // თუ გინდა მხოლოდ Sanity-ს პროდუქტები ჩანდეს, გამოიყენე =
            container.innerHTML += sanityProductsHtml;
        }
    } catch (error) {
        console.error("Sanity Error:", error);
    }
}

// 4. სკროლერის ფუნქცია (ისრებით სასრიალოდ)
function setupSlider() {
    const wrapper = document.querySelector(".product-wrapper");
    const arrowNext = document.querySelector(".arrow-next");
    const arrowPrev = document.querySelector(".arrow-prev");

    if (wrapper && arrowNext && arrowPrev) {
        arrowNext.addEventListener("click", () => {
            const card = wrapper.querySelector(".product-card");
            if (card) {
                const cardWidth = card.offsetWidth + 20;
                wrapper.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        });

        arrowPrev.addEventListener("click", () => {
            const card = wrapper.querySelector(".product-card");
            if (card) {
                const cardWidth = card.offsetWidth + 20;
                wrapper.scrollBy({ left: -cardWidth, behavior: "smooth" });
            }
        });

        // Drag Scrolling (მაუსით გაწევა)
        let isDown = false;
        let startX;
        let scrollLeft;

        wrapper.addEventListener("mousedown", (e) => {
            isDown = true;
            wrapper.classList.add("active");
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });
        wrapper.addEventListener("mouseleave", () => { isDown = false; });
        wrapper.addEventListener("mouseup", () => { isDown = false; });
        wrapper.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1.5;
            wrapper.scrollLeft = scrollLeft - walk;
        });
    }
}

// ჰედერის გაფერადება სკროლისას
window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (header) {
        if (window.scrollY > 0) {
            header.classList.add("opaque");
        } else {
            header.classList.remove("opaque");
        }
    }
});