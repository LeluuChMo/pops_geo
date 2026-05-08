(function() {
    const query = encodeURIComponent(`*[_type == "homePageBlog"][0]{
        title,
        description,
        "imageUrl": image.asset->url
    }`);

    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
        .then(res => res.json())
        .then(({ result }) => {
            const container = document.getElementById('home-blog-container');
            if (!container || !result) return;

            const formattedDescription = result.description ? result.description.replace(/\n/g, '<br>') : "";

            container.innerHTML = `
                <article class="blog-item">
                    <div class="blog-image">
                        <img src="${result.imageUrl}" alt="${result.title}">
                    </div>
                    <div class="blog-content">
                        <h3>${result.title}</h3>
                        <p>${formattedDescription}</p>
                        <a href="blog.html" class="read-more">ყველას ნახვა</a>
                    </div>
                </article>
            `;
        })
        .catch(err => console.error("მთავარი ბლოგი ვერ ჩაიტვირთა:", err));
})();