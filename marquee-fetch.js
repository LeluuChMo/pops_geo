(function() {
    const query = encodeURIComponent(`*[_type == "marqueeSettings"][0]`);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
        .then(res => res.json())
        .then(({ result }) => {
            const wrapper = document.getElementById('marquee-wrapper');
            if (!wrapper || !result || !result.isActive) return;

            wrapper.innerHTML = `
                <div class="marquee-container">
                    <div class="marquee-text">
                        ${result.text} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; ${result.text}
                    </div>
                </div>
            `;
        })
        .catch(err => console.error("Marquee Error:", err));
})();