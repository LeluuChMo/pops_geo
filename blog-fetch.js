(function() {
    const blogQuery = encodeURIComponent(`*[_type == "blog"] | order(_createdAt desc){
        title,
        content,
        "imageUrl": mainImage.asset->url
    }`);

    const blogURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${blogQuery}`;

    fetch(blogURL)
        .then(res => res.json())
        .then(({ result }) => {
            const blogContainer = document.getElementById('blog-container');
            if (!blogContainer) return;

            blogContainer.innerHTML = ""; 

            result.forEach(post => {
                const formattedContent = post.content ? post.content.replace(/\n/g, '<br>') : "";

                blogContainer.innerHTML += `
                    <div class="blogpage-card">
                        <img src="${post.imageUrl}" alt="${post.title}">
                        <div class="blogpage-content">
                            <h2>${post.title}</h2>
                            
                            <div class="blog-text-container">
                                <p>${formattedContent}</p>
                            </div>

                            <button class="toggle-blog-btn">სრულად ნახვა</button>
                        </div>
                    </div>
                `;
            });

            setupAccordion();
        })
        .catch(err => console.error("ბლოგები ვერ ჩაიტვირთა:", err));

    function setupAccordion() {
        const buttons = document.querySelectorAll('.toggle-blog-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function() {

                const textContainer = this.previousElementSibling;

                textContainer.classList.toggle('expanded');

                if (textContainer.classList.contains('expanded')) {
                    this.textContent = 'აკეცვა';
                } else {
                    this.textContent = 'სრულად ნახვა';
                }
            });
        });
    }
})();