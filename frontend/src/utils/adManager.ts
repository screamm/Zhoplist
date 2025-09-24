// Simplified Ad Manager för Zhoplist - Endast Banner Ads
// Användarvänlig reklamlösning med engångsköp för premium

import { isPremiumUser, setPremiumUser } from './pwa';

// AdMob konfiguration - Endast Banner Ads
const AD_CONFIG = {
  // App ID
  APP_ID: 'ca-app-pub-6748269812398218~1968418017',

  // Banner Ad ID (Produktion)
  BANNER_AD_ID: 'ca-app-pub-6748269812398218/5769714618',

  // Test ID för utveckling
  TEST_BANNER_AD_ID: 'ca-app-pub-3940256099942544/6300978111',

  // Environment flag
  USE_TEST_ADS: false, // Sätt till false för produktion
};

// Borttagna oanvända Ad IDs:
// Interstitial: ca-app-pub-6748269812398218/1146290931 (ej längre använd)
// Rewarded: ca-app-pub-6748269812398218/1830469601 (ej längre använd)

// Premium konfiguration - Engångsköp
const PREMIUM_CONFIG = {
  PRICE_SEK: '69 kr',
  PRICE_USD: '$6.99',
  DESCRIPTION: 'Ta bort all reklam för alltid',
  BENEFIT: 'Helt reklamfri upplevelse',
};

export class AdManager {
  private static instance: AdManager;
  private adsInitialized = false;
  private bannerVisible = false;
  private adMobFailed = false;

  private constructor() {
    this.init();
  }

  static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager();
    }
    return AdManager.instance;
  }

  private async init() {
    // Kolla om användaren är premium
    if (isPremiumUser()) {
      console.log('Premium user - no ads');
      return;
    }

    // Initiera AdMob (när Capacitor är installerat)
    if (typeof (window as unknown as { Capacitor?: unknown }).Capacitor !== 'undefined') {
      try {
        const { AdMob } = await import('@capacitor-community/admob');

        await AdMob.initialize({
          testDeviceIdentifiers: [], // Lägg till ditt test device ID här vid utveckling
          initializeForTesting: AD_CONFIG.USE_TEST_ADS,
        } as Record<string, unknown>);

        this.adsInitialized = true;
        console.log('AdMob initialized - Banner only mode');

        // Visa AdMob banner efter 5 sekunder
        setTimeout(() => {
          this.showBannerAd();
        }, 5000);

      } catch (error) {
        console.error('AdMob initialization failed:', error);
      }
    } else {
      console.log('Not running in Capacitor - ads disabled');
    }
  }

  // Header Banner - Diskret banner i header-området
  createHeaderBanner(): HTMLElement | null {
    if (isPremiumUser()) return null;

    // Skapa en diskret banner för header
    const banner = document.createElement('div');
    banner.id = 'zhoplist-header-banner';
    banner.className = 'w-full bg-gray-100 dark:bg-gray-700 text-center py-1 text-xs text-gray-600 dark:text-gray-300';
    banner.innerHTML = `
      <span>Zhoplist är gratis med reklam • </span>
      <button id="premium-upgrade" class="text-blue-600 dark:text-blue-400 underline font-medium">
        Slipp reklam för ${PREMIUM_CONFIG.PRICE_SEK}
      </button>
    `;

    // Lägg till click handler
    banner.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'premium-upgrade') {
        this.showPremiumDialog();
      }
    });

    return banner;
  }

  // Legacy banner ads (fortfarande tillgänglig för test)
  async showBannerAd() {
    if (!this.adsInitialized || isPremiumUser() || this.bannerVisible) return;

    try {
      const { AdMob, BannerAdSize, BannerAdPosition } =
        await import('@capacitor-community/admob');

      const options: Record<string, unknown> = {
        adId: AD_CONFIG.USE_TEST_ADS ? AD_CONFIG.TEST_BANNER_AD_ID : AD_CONFIG.BANNER_AD_ID,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.TOP_CENTER,
        margin: 0,
        isTesting: AD_CONFIG.USE_TEST_ADS,
      };

      await (AdMob.showBanner as any)(options);
      this.bannerVisible = true;
      this.adMobFailed = false;
      console.log('Banner ad displayed');
    } catch (error) {
      console.error('Failed to show banner:', error);
      this.adMobFailed = true;
      // Notifiera appen om att fallback ska visas
      window.dispatchEvent(new CustomEvent('admob-failed'));
    }
  }

  async hideBannerAd() {
    if (!this.adsInitialized || !this.bannerVisible) return;

    try {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.hideBanner();
      this.bannerVisible = false;
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Failed to hide banner:', error);
    }
  }

  // Dölj banner temporärt under aktiv shopping
  async pauseBannerDuringShopping() {
    if (this.bannerVisible && !isPremiumUser()) {
      await this.hideBannerAd();

      // Visa igen efter 2 minuter
      setTimeout(() => {
        if (!isPremiumUser()) {
          this.showBannerAd();
        }
      }, 120000);
    }
  }

  // Premium Purchase - Engångsköp
  async purchasePremium(): Promise<boolean> {
    // Web fallback om inte i app
    if (typeof (window as unknown as { Capacitor?: unknown }).Capacitor === 'undefined') {
      console.log('Opening web payment');
      window.open('https://zhoplist.com/premium', '_blank');
      return false;
    }

    try {
      // Här skulle Play Billing integreras senare
      // För nu, simulera köp för test
      console.log('Premium purchase initiated - 69 SEK');

      // TODO: Implementera Play Billing när redo
      /*
      const { Purchases } = await import('@revenuecat/purchases-capacitor');

      const offerings = await Purchases.getOfferings();
      const purchasePackage = offerings.current?.availablePackages[0];

      if (purchasePackage) {
        const purchaseResult = await Purchases.purchasePackage({ aPackage: purchasePackage });

        if (purchaseResult.customerInfo.entitlements.active['premium']) {
          setPremiumUser(true);
          await this.hideBannerAd();
          this.showNotification('Tack! Nu är Zhoplist helt reklamfri! 🎉');
          return true;
        }
      }
      */

      // Temporär test-implementation
      if (confirm(`Köp Zhoplist Premium för ${PREMIUM_CONFIG.PRICE_SEK}?\n\n${PREMIUM_CONFIG.BENEFIT}`)) {
        setPremiumUser(true);
        await this.hideBannerAd();
        this.showNotification('Tack! Nu är Zhoplist helt reklamfri! 🎉');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Purchase failed:', error);
      this.showNotification('Köpet kunde inte genomföras. Försök igen senare.');
      return false;
    }
  }

  // Återställ köp (om användare byter enhet)
  async restorePurchases(): Promise<boolean> {
    if (typeof (window as unknown as { Capacitor?: unknown }).Capacitor === 'undefined') {
      return false;
    }

    try {
      // TODO: Implementera med Play Billing
      console.log('Restore purchases - checking previous purchases');

      /*
      const { Purchases } = await import('@revenuecat/purchases-capacitor');
      const customerInfo = await Purchases.restorePurchases();

      if (customerInfo.entitlements.active['premium']) {
        setPremiumUser(true);
        await this.hideBannerAd();
        this.showNotification('Premium återställd! 🎉');
        return true;
      }
      */

      this.showNotification('Inga tidigare köp hittades');
      return false;
    } catch (error) {
      console.error('Restore failed:', error);
      return false;
    }
  }

  // Visa premium-dialog (enkel och tydlig)
  showPremiumDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    dialog.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
        <h3 class="text-xl font-bold mb-4 dark:text-white">
          Ta bort reklam? 🚫
        </h3>
        <div class="mb-6">
          <p class="mb-2 dark:text-gray-200">
            Få en helt reklamfri upplevelse för alltid!
          </p>
          <p class="text-2xl font-bold text-green-600 dark:text-green-400">
            Endast ${PREMIUM_CONFIG.PRICE_SEK}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Engångsköp - inga prenumerationer
          </p>
        </div>
        <div class="flex gap-3">
          <button id="premium-buy-btn" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
            Köp Premium
          </button>
          <button id="premium-close-btn" class="flex-1 bg-gray-200 dark:bg-gray-700 dark:text-white py-3 rounded-lg">
            Senare
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    // Event handlers
    document.getElementById('premium-buy-btn')?.addEventListener('click', () => {
      this.purchasePremium();
      document.body.removeChild(dialog);
    });

    document.getElementById('premium-close-btn')?.addEventListener('click', () => {
      document.body.removeChild(dialog);
    });

    // Stäng vid klick utanför
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        document.body.removeChild(dialog);
      }
    });
  }

  // Smart prompt för premium (icke-påträngande)
  checkPremiumPrompt() {
    const appOpens = parseInt(localStorage.getItem('appOpens') || '0');
    const lastPromptTime = parseInt(localStorage.getItem('lastPremiumPrompt') || '0');
    const now = Date.now();

    // Visa efter 10 användningar, max en gång per vecka
    if (appOpens >= 10 && (now - lastPromptTime) > 7 * 24 * 60 * 60 * 1000) {
      this.showPremiumDialog();
      localStorage.setItem('lastPremiumPrompt', now.toString());
    }
  }

  private showNotification(message: string) {
    const event = new CustomEvent('app-notification', {
      detail: { message }
    });
    window.dispatchEvent(event);
  }

  // Track app usage (utan automatiska prompts)
  trackAppOpen() {
    const opens = parseInt(localStorage.getItem('appOpens') || '0') + 1;
    localStorage.setItem('appOpens', opens.toString());
    console.log(`App opened ${opens} times`);
    // Ingen automatisk premium prompt längre
  }

  // Call när användaren lägger till/checkar items
  trackUserActivity() {
    localStorage.setItem('lastItemActivity', Date.now().toString());
  }

  // Check om användaren är mitt i shopping
  isUserActivelyShopping(): boolean {
    const lastActivity = parseInt(localStorage.getItem('lastItemActivity') || '0');
    const now = Date.now();
    // Aktiv om använt inom 2 minuter
    return (now - lastActivity) < 120000;
  }

  // Check om AdMob har misslyckats
  hasAdMobFailed(): boolean {
    return this.adMobFailed;
  }

  // Försök visa AdMob igen
  retryAdMob() {
    this.adMobFailed = false;
    this.showBannerAd();
  }
}

// Helper functions
export function setAdTestMode(isTest: boolean) {
  (AD_CONFIG as Record<string, unknown>).USE_TEST_ADS = isTest;
  console.log(`AdMob test mode: ${isTest ? 'ON' : 'OFF'}`);
}

export function getPremiumPrice(): string {
  return PREMIUM_CONFIG.PRICE_SEK;
}

// Export singleton instance
export const adManager = AdManager.getInstance();