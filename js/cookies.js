class CookieConsent {
    constructor() {
        this.cookieConsentStatus = localStorage.getItem('cookieConsent');
        if (!this.cookieConsentStatus) {
            this.showCookieBanner();
        }
    }

    showCookieBanner() {
        const banner = document.createElement('div');
        banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50';
        banner.innerHTML = `
            <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                <div class="mb-4 md:mb-0">
                    <p class="text-sm">
                        Utilizziamo i cookie per migliorare la tua esperienza. 
                        Navigando questo sito, accetti la nostra 
                        <a href="/legal/privacy-policy.html" class="underline hover:text-indigo-300">Privacy Policy</a>.
                    </p>
                </div>
                <div class="flex space-x-4">
                    <button id="accept-cookies" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Accetta
                    </button>
                    <button id="reject-cookies" class="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition">
                        Rifiuta
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('accept-cookies').addEventListener('click', () => this.acceptCookies());
        document.getElementById('reject-cookies').addEventListener('click', () => this.rejectCookies());
    }

    acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        this.hideBanner();
    }

    rejectCookies() {
        localStorage.setItem('cookieConsent', 'rejected');
        this.hideBanner();
    }

    hideBanner() {
        const banner = document.querySelector('.fixed.bottom-0');
        if (banner) {
            banner.remove();
        }
    }
}

window.addEventListener('load', () => {
    new CookieConsent();
});
