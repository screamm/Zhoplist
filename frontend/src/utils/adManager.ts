// Ad Manager för Zhoplist - AdMob och Play Billing integration

import { isPremiumUser } from './pwa';

// AdMob konfiguration
const AD_CONFIG = {
  // App ID
  APP_ID: 'ca-app-pub-6748269812398218~1968418017',
  
  // Produktion IDs
  BANNER_AD_ID: 'ca-app-pub-6748269812398218/5769714618',
  INTERSTITIAL_AD_ID: 'ca-app-pub-6748269812398218/1146290931',
  REWARDED_AD_ID: 'ca-app-pub-6748269812398218/1830469601',
  
  // Test IDs (för utveckling)
  TEST_BANNER_AD_ID: 'ca-app-pub-3940256099942544/6300978111',
  TEST_INTERSTITIAL_AD_ID: 'ca-app-pub-3940256099942544/1033173712',
  TEST_REWARDED_AD_ID: 'ca-app-pub-3940256099942544/5224354917',
  
  // Environment flag
  USE_TEST_ADS: false, // Sätt till false för produktion
};

// Play Billing konfiguration
const BILLING_CONFIG = {
  REMOVE_ADS_SKU: 'remove_ads_forever',
  PRICE: '149 kr',
  PRICE_USD: '$14.99',
  COMPARISON: 'Mindre än två kaffe på Espresso House',
};

export class AdManager {
  private static instance: AdManager;
  private adsInitialized = false;
  private interstitialCounter = 0;
  private lastInterstitialTime = 0;

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
      console.log('Premium user - ads disabled');
      return;
    }

    // Initiera AdMob (när Capacitor är installerat)
    if (typeof (window as any).Capacitor !== 'undefined') {
      try {
        const { AdMob } = await import('@capacitor-community/admob');
        
        await AdMob.initialize({
          testDeviceIdentifiers: ['YOUR_TEST_DEVICE_ID'], // Lägg till ditt test device ID
          initializeForTesting: AD_CONFIG.USE_TEST_ADS,
        } as any);

        this.adsInitialized = true;
        console.log('AdMob initialized');
        
        // Visa banner ad
        this.showBannerAd();
      } catch (error) {
        console.error('AdMob initialization failed:', error);
      }
    } else {
      console.log('Not running in Capacitor - ads disabled');
    }
  }

  // Banner Ads
  async showBannerAd() {
    if (!this.adsInitialized || isPremiumUser()) return;

    try {
      const { AdMob, BannerAdSize, BannerAdPosition } = 
        await import('@capacitor-community/admob');
      
      const options: any = {
        adId: AD_CONFIG.USE_TEST_ADS ? AD_CONFIG.TEST_BANNER_AD_ID : AD_CONFIG.BANNER_AD_ID,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: AD_CONFIG.USE_TEST_ADS,
      };

      await AdMob.showBanner(options);
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Failed to show banner:', error);
    }
  }

  async hideBannerAd() {
    if (!this.adsInitialized) return;

    try {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.hideBanner();
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Failed to hide banner:', error);
    }
  }

  // Interstitial Ads - Smart timing för shopping lists
  async showInterstitialAd(): Promise<boolean> {
    if (!this.adsInitialized || isPremiumUser()) return false;

    // Rate limiting - max var 3:e minut
    const now = Date.now();
    if (now - this.lastInterstitialTime < 180000) {
      return false;
    }

    // Visa endast var 3:e gång
    this.interstitialCounter++;
    if (this.interstitialCounter % 3 !== 0) {
      return false;
    }

    // ALDRIG visa under aktiv shopping
    if (this.isUserActivelyShopping()) {
      return false;
    }

    try {
      const { AdMob } = await import('@capacitor-community/admob');
      
      const options: any = {
        adId: AD_CONFIG.USE_TEST_ADS ? AD_CONFIG.TEST_INTERSTITIAL_AD_ID : AD_CONFIG.INTERSTITIAL_AD_ID,
        isTesting: AD_CONFIG.USE_TEST_ADS,
      };

      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
      
      this.lastInterstitialTime = now;
      console.log('Interstitial ad shown');
      return true;
    } catch (error) {
      console.error('Failed to show interstitial:', error);
      return false;
    }
  }

  // Rewarded Ads
  async showRewardedAd(): Promise<boolean> {
    if (!this.adsInitialized || isPremiumUser()) return false;

    try {
      const { AdMob, RewardAdPluginEvents } = 
        await import('@capacitor-community/admob');
      
      return new Promise(async (resolve) => {
        // Setup reward listener
        AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward: any) => {
          console.log('User rewarded:', reward);
          this.grantTemporaryPremium();
          resolve(true);
        });

        AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
          resolve(false);
        });

        const options: any = {
          adId: AD_CONFIG.USE_TEST_ADS ? AD_CONFIG.TEST_REWARDED_AD_ID : AD_CONFIG.REWARDED_AD_ID,
          isTesting: AD_CONFIG.USE_TEST_ADS,
        };

        await AdMob.prepareRewardVideoAd(options);
        await AdMob.showRewardVideoAd();
      });
    } catch (error) {
      console.error('Failed to show rewarded ad:', error);
      return false;
    }
  }

  // Grant temporary premium (24 hours)
  private grantTemporaryPremium() {
    const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    localStorage.setItem('temporaryPremium', expiryTime.toString());
    this.hideBannerAd();
    
    // Visa notifikation
    this.showNotification('Reklam borttagen i 24 timmar! 🎉');
    
    // Sätt timer för att återaktivera ads
    setTimeout(() => {
      this.checkTemporaryPremium();
    }, 24 * 60 * 60 * 1000);
  }

  checkTemporaryPremium(): boolean {
    const expiryTime = localStorage.getItem('temporaryPremium');
    if (!expiryTime) return false;

    const expiry = parseInt(expiryTime);
    if (Date.now() < expiry) {
      return true;
    } else {
      localStorage.removeItem('temporaryPremium');
      this.showBannerAd();
      return false;
    }
  }

  // Play Billing - One-time purchase
  async purchasePremium(): Promise<boolean> {
    if (typeof (window as any).Capacitor === 'undefined') {
      console.log('Not running in Capacitor - opening web payment');
      // Fallback till web payment
      window.open('https://zhoplist.com/premium', '_blank');
      return false;
    }

    try {
      // Detta kräver @capacitor-community/play-billing plugin
      // const { PlayBilling } = await import('@capacitor-community/play-billing');
      console.log('Play Billing not implemented yet');
      return false;
      /*
      
      // Koppla till Play Store
      await PlayBilling.connect();
      
      // Hämta produkt-info
      const products = await PlayBilling.queryProductDetails({
        productIds: [BILLING_CONFIG.REMOVE_ADS_SKU],
        productType: 'inapp',
      });

      if (products.length === 0) {
        throw new Error('Product not found');
      }

      // Genomför köp
      const purchase = await PlayBilling.purchaseProduct({
        productId: BILLING_CONFIG.REMOVE_ADS_SKU,
        productType: 'inapp',
        offerToken: products[0].offerToken,
      });

      if (purchase.purchased) {
        // Bekräfta köp
        await PlayBilling.acknowledgePurchase({
          purchaseToken: purchase.purchaseToken,
        });

        // Aktivera premium
        setPremiumUser(true);
        this.hideBannerAd();
        this.showNotification('Tack för ditt köp! Reklam borttagen för alltid! 🎊');
        
        return true;
      }

      return false;
      */
    } catch (error) {
      console.error('Purchase failed:', error);
      this.showNotification('Köpet misslyckades. Försök igen senare.');
      return false;
    }
  }

  // Återställ köp (om användare byter enhet)
  async restorePurchases(): Promise<boolean> {
    if (typeof (window as any).Capacitor === 'undefined') {
      return false;
    }

    try {
      // const { PlayBilling } = await import('@capacitor-community/play-billing');
      console.log('Play Billing not implemented yet');
      return false;
      /*
      
      await PlayBilling.connect();
      
      const purchases = await PlayBilling.queryPurchases({
        productType: 'inapp',
      });

      for (const purchase of purchases) {
        if (purchase.productId === BILLING_CONFIG.REMOVE_ADS_SKU && 
            purchase.purchaseState === 1) { // PURCHASED
          setPremiumUser(true);
          this.hideBannerAd();
          this.showNotification('Premium återställd! 🎉');
          return true;
        }
      }

      this.showNotification('Inga tidigare köp hittades');
      return false;
      */
    } catch (error) {
      console.error('Restore failed:', error);
      return false;
    }
  }

  // Smart prompts för konvertering
  showConversionPrompt() {
    const appOpens = parseInt(localStorage.getItem('appOpens') || '0');
    const lastPromptTime = parseInt(localStorage.getItem('lastPromptTime') || '0');
    const now = Date.now();

    // Visa prompt efter 20 användningar, max en gång per vecka
    if (appOpens >= 20 && (now - lastPromptTime) > 7 * 24 * 60 * 60 * 1000) {
      this.showPurchaseDialog();
      localStorage.setItem('lastPromptTime', now.toString());
    }
  }

  private showPurchaseDialog() {
    // Skapa custom dialog
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    dialog.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 class="text-xl font-bold mb-4">Älskar du Zhoplist? 🇸🇪</h3>
        <p class="mb-4">Du har använt appen ${localStorage.getItem('appOpens')} gånger!</p>
        <p class="mb-2">Ta bort all reklam för alltid för bara <strong>${BILLING_CONFIG.PRICE}</strong></p>
        <p class="text-sm text-gray-600 mb-6">${BILLING_CONFIG.COMPARISON}</p>
        <div class="flex gap-3">
          <button id="purchase-btn" class="flex-1 bg-green-600 text-white py-2 rounded font-semibold">
            Köp Premium
          </button>
          <button id="watch-ad-btn" class="flex-1 bg-gray-200 py-2 rounded text-sm">
            Titta på reklam (24h gratis)
          </button>
        </div>
        <button id="close-btn" class="w-full mt-3 text-gray-500">
          Kanske senare
        </button>
      </div>
    `;

    document.body.appendChild(dialog);

    // Event handlers
    document.getElementById('purchase-btn')?.addEventListener('click', () => {
      this.purchasePremium();
      document.body.removeChild(dialog);
    });

    document.getElementById('watch-ad-btn')?.addEventListener('click', () => {
      this.showRewardedAd();
      document.body.removeChild(dialog);
    });

    document.getElementById('close-btn')?.addEventListener('click', () => {
      document.body.removeChild(dialog);
    });
  }

  private showNotification(message: string) {
    const event = new CustomEvent('app-notification', { 
      detail: { message } 
    });
    window.dispatchEvent(event);
  }

  // Smart timing functions
  private isUserActivelyShopping(): boolean {
    const lastActivity = parseInt(localStorage.getItem('lastItemActivity') || '0');
    const now = Date.now();
    
    // Om användaren lagt till/checkeat items senaste 2 minuterna
    return (now - lastActivity) < 120000;
  }
  
  private updateUserActivity() {
    localStorage.setItem('lastItemActivity', Date.now().toString());
  }
  
  // Track app usage
  trackAppOpen() {
    const opens = parseInt(localStorage.getItem('appOpens') || '0') + 1;
    localStorage.setItem('appOpens', opens.toString());
    
    // Kolla om vi ska visa conversion prompt
    this.showConversionPrompt();
  }
  
  // Call this when user adds/checks items
  trackItemActivity() {
    this.updateUserActivity();
  }

  // Event handlers för lista-actions
  onListCompleted() {
    // Visa interstitial när lista är klar
    this.showInterstitialAd();
  }

  onListShared() {
    // Möjlighet att visa ad efter delning
    if (Math.random() > 0.5) { // 50% chans
      this.showInterstitialAd();
    }
  }
}

// Helper function för att växla mellan test och produktion
export function setAdTestMode(isTest: boolean) {
  (AD_CONFIG as any).USE_TEST_ADS = isTest;
  console.log(`AdMob test mode: ${isTest ? 'ON' : 'OFF'}`);
}

// Helper function för att få rätt Ad ID
export function getAdId(type: 'banner' | 'interstitial' | 'rewarded'): string {
  const useTest = AD_CONFIG.USE_TEST_ADS;
  
  switch (type) {
    case 'banner':
      return useTest ? AD_CONFIG.TEST_BANNER_AD_ID : AD_CONFIG.BANNER_AD_ID;
    case 'interstitial':
      return useTest ? AD_CONFIG.TEST_INTERSTITIAL_AD_ID : AD_CONFIG.INTERSTITIAL_AD_ID;
    case 'rewarded':
      return useTest ? AD_CONFIG.TEST_REWARDED_AD_ID : AD_CONFIG.REWARDED_AD_ID;
    default:
      throw new Error(`Unknown ad type: ${type}`);
  }
}

// Export singleton instance
export const adManager = AdManager.getInstance();