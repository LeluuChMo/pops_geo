const PROJECT_ID = '156rdx1d';
const DATASET = "production";

async function loadFooter() {
    const QUERY = encodeURIComponent('*[_type == "footer"][0]');
    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    try {
        const response = await fetch(URL);
        const { result } = await response.json();

        if (result) {
            const footerContainer = document.querySelector('.site-footer');
            if (!footerContainer) return;

            footerContainer.innerHTML = `
                <div class="container">
                  <div class="footer-container">
                    <div class="footer-col">
                      <div class="footer-logo">
                        <a href="/" class="logo"><img src="images/logo.png" alt="logo"></a>
                      </div>
                      <p class="footer-text">${result.footerText || ''}</p>
                    </div>
                    <div class="footer-col">
                      <h4>ნავიგაცია</h4>
                      <ul>
                        <li><a href="/">მთავარი</a></li>
                        <li><a href="products.html">პროდუქტები</a></li>
                        <li><a href="about.html">ჩვენ შესახებ</a></li>
                        <li><a href="terms.html">წესები და პირობები</a></li>
                      </ul>
                    </div>
                    <div class="footer-col">
                      <h4>კონტაქტი</h4>
                      <div class="information">
                        <a href="mailto:${result.email}">${result.email || ''}</a>
                        <p>${result.phone || ''}</p>
                      </div>
                    </div>
                    <div class="footer-col">
                      <h4>სოციალური ქსელები</h4>
                      <div class="social-links">
                        ${result.facebook ? `<a href="${result.facebook}" target="_blank"><img src="icons/facebook.png" alt="Facebook"></a>` : ''}
                        ${result.instagram ? `<a href="${result.instagram}" target="_blank"><img src="icons/instagram.png" alt="Instagram"></a>` : ''}
                        ${result.tiktok ? `<a href="${result.tiktok}" target="_blank"><img src="icons/tiktok.png" alt="TikTok"></a>` : ''}
                        ${result.whatsapp ? `<a href="${result.whatsapp}" target="_blank"><img src="icons/whatsapp.png" alt="WhatsApp"></a>` : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer-bottom">
                  ${result.copyright || '© 2026 Poppers.Ge • All rights reserved.'}
                </div>
            `;
        }
    } catch (error) {
        console.error("Footer Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadFooter);