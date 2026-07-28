const PROJECT_ID = '156rdx1d'; 
const DATASET = "production";

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Burger Menu-ს ლოგიკა
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            nav.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });
    }

    // 2. ბლოგის აკეცვა / ჩამოშლის ლოგიკა (Event Delegation)
    const blogContainer = document.getElementById("home-blog-container");

    if (blogContainer) {
        blogContainer.addEventListener("click", (event) => {
            const button = event.target.closest(".toggle-blog-btn");
            if (!button) return;

            const blogItem = button.closest(".blog-item") || button.closest(".blog-content");
            if (!blogItem) return;

            const textContainer = blogItem.querySelector(".blog-text-container");
            if (!textContainer) return;

            textContainer.classList.toggle("expanded");

            if (textContainer.classList.contains("expanded")) {
                button.textContent = "აკეცვა";
            } else {
                button.textContent = "სრულად ნახვა";
            }
        });
    }

    loadProducts();
    loadEvents(); 
    loadBlogs(); 
});


// --- პროდუქტების ჩატვირთვა ---
async function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    const QUERY = encodeURIComponent('*[_type == "catalogProduct"] | order(orderRank asc){title, price, isStock, volume, "imageUrl": image.asset->url, powerLevel, description}');
    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.result && data.result.length > 0) {

            container.innerHTML = "";

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

            container.innerHTML = sanityProductsHtml;

            setupSlider();
        }
    } catch (error) {
        console.error("Sanity Products Error:", error);
    }
}


// --- ივენთების / პარტნიორების ჩატვირთვა ---
async function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    const EVENT_QUERY = encodeURIComponent('*[_type == "event"]{name, link, "logoUrl": logo.asset->url}');
    const EVENT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${EVENT_QUERY}`;

    try {
        const response = await fetch(EVENT_URL);
        const data = await response.json();

        if (data.result && data.result.length > 0) {
            eventsContainer.innerHTML = data.result.map(event => `
                <a href="${event.link || '#'}" target="_blank" class="partner-card">
                    <img src="${event.logoUrl}" alt="${event.name}">
                </a>
            `).join('');
        }
    } catch (error) {
        console.error("Sanity Events Error:", error);
    }
}


// --- ბლოგების ჩატვირთვა (homePageBlog სქემის მიხედვით) ---
async function loadBlogs() {
    const blogContainer = document.getElementById('home-blog-container');
    if (!blogContainer) return;

    const BLOG_QUERY = encodeURIComponent('*[_type == "homePageBlog"]{title, description, "imageUrl": image.asset->url}');
    const BLOG_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${BLOG_QUERY}`;

    try {
        const response = await fetch(BLOG_URL);
        const data = await response.json();

        if (data.result && data.result.length > 0) {
            blogContainer.innerHTML = data.result.map((blog, index) => {
                const isReverse = index % 2 !== 0 ? 'reverse' : '';

                return `
                    <div class="blog-item ${isReverse}">
                        <div class="blog-image">
                            <img src="${blog.imageUrl || 'productpics/placeholder.jpg'}" alt="${blog.title}">
                        </div>
                        <div class="blog-content">
                            <h3>${blog.title}</h3>
                            <div class="blog-text-container">
                                <p>${blog.description || ''}</p>
                            </div>
                            <button class="toggle-blog-btn">ვრცლად</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error("Sanity Blog Error:", error);
    }
}


// --- სლაიდერის ფუნქციონალი ---
function setupSlider() {
    const wrapper = document.querySelector(".product-wrapper");
    const arrowNext = document.querySelector(".arrow-next");
    const arrowPrev = document.querySelector(".arrow-prev");

    if (wrapper && arrowNext && arrowPrev) {
        const newArrowNext = arrowNext.cloneNode(true);
        const newArrowPrev = arrowPrev.cloneNode(true);
        arrowNext.parentNode.replaceChild(newArrowNext, arrowNext);
        arrowPrev.parentNode.replaceChild(newArrowPrev, arrowPrev);

        newArrowNext.addEventListener("click", () => {
            const card = wrapper.querySelector(".product-card");
            if (card) {
                const cardWidth = card.offsetWidth + 20;
                wrapper.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        });

        newArrowPrev.addEventListener("click", () => {
            const card = wrapper.querySelector(".product-card");
            if (card) {
                const cardWidth = card.offsetWidth + 20;
                wrapper.scrollBy({ left: -cardWidth, behavior: "smooth" });
            }
        });

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


// --- Header Sticky ეფექტი ---
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