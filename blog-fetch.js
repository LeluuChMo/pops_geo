(function() {
    // ყოველგვარი const PROJECT_ID-ის გარეშე, ვიყენებთ გლობალურს
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

            blogContainer.innerHTML = ""; // ვასუფთავებთ კონტეინერს

            result.forEach(post => {
                // ტექსტში ენთერების შენარჩუნება (ბრაუზერისთვის <br>-ებად გადაქცევა)
                const formattedContent = post.content ? post.content.replace(/\n/g, '<br>') : "";

                blogContainer.innerHTML += `
                    <div class="blogpage-card">
                        <img src="${post.imageUrl}" alt="${post.title}">
                        <div class="blogpage-content">
                            <h2>${post.title}</h2>
                            <p>${formattedContent}</p>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("ბლოგები ვერ ჩაიტვირთა:", err));
})();