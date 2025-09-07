// Ad Mediation Strategy för Zhoplist
// Kombinerar flera ad networks för maximal intäkt

interface AdNetwork {
  name: string;
  priority: number;
  eCPM: number;
  fillRate: number;
  configuration: any;
}

export const AD_NETWORKS: AdNetwork[] = [
  {
    name: 'Google AdMob',
    priority: 1,
    eCPM: 1.2,
    fillRate: 0.9,
    configuration: {
      appId: 'ca-app-pub-6748269812398218~1968418017',
      bannerUnitId: 'ca-app-pub-6748269812398218/5769714618',
      interstitialUnitId: 'ca-app-pub-6748269812398218/1146290931',
      rewardedUnitId: 'ca-app-pub-6748269812398218/1830469601'
    }
  },
  {
    name: 'Facebook Audience Network',
    priority: 2,
    eCPM: 1.0,
    fillRate: 0.8,
    configuration: {
      placementId: 'XXXXXXXXXXXXXXXX_YYYYYYYYYY',
      bannerSize: '320x50',
      testMode: true
    }
  },
  {
    name: 'Adnami Nordic',
    priority: 3,
    eCPM: 2.5, // Högre för svenska användare
    fillRate: 0.4,
    configuration: {
      siteId: 'your-site-id',
      region: 'nordics',
      language: 'sv'
    }
  }
];

// Smart ad placement som inte stör användaren
export const AD_PLACEMENT_RULES = {
  banner: {
    show: true,
    position: 'bottom-safe-area',
    hideWhen: ['adding-item', 'editing-list', 'first-launch'],
    showAfter: 'app-open-5-seconds',
    refreshInterval: 30000 // 30 sekunder
  },
  
  interstitial: {
    maxFrequency: '1-per-day',
    minTimeBetween: 180000, // 3 minuter
    showWhen: [
      'list-completed-with-5-items',
      'app-background-foreground',
      'after-list-sharing'
    ],
    neverShowWhen: [
      'user-actively-shopping',
      'within-first-5-minutes',
      'during-onboarding'
    ]
  },
  
  rewarded: {
    trigger: 'user-initiated-only',
    placement: ['settings-menu', 'premium-prompt'],
    reward: '24h-ad-free',
    cta: 'Få 24h reklamfritt - titta på kort video'
  },
  
  native: {
    placement: 'completed-items-section',
    frequency: 'every-6th-completed-item',
    style: 'match-list-design',
    label: 'Sponsrad'
  }
};

// Svenska mat/butiks-kategorier för bättre targeting
export const SWEDISH_AD_TARGETING = {
  categories: [
    'mat-och-dryck',
    'hushåll',
    'hälsa-och-skönhet',
    'hem-och-trädgård'
  ],
  
  keywords: [
    'handla mat',
    'inköpslista',
    'matbutik',
    'ICA',
    'Coop',
    'Willys',
    'familj shopping'
  ],
  
  demographics: {
    country: 'SE',
    language: 'sv',
    interests: ['family', 'grocery', 'household']
  }
};

// Revenue optimization
export class AdMediation {
  private currentNetwork = 0;
  private failedAttempts = 0;
  
  async showAd(type: 'banner' | 'interstitial' | 'rewarded'): Promise<boolean> {
    for (let i = 0; i < AD_NETWORKS.length; i++) {
      const network = AD_NETWORKS[this.currentNetwork];
      
      try {
        const success = await this.loadAdFromNetwork(network, type);
        if (success) {
          this.resetFailureCount();
          return true;
        }
      } catch (error) {
        console.warn(`${network.name} failed, trying next...`);
        this.moveToNextNetwork();
      }
    }
    
    return false; // Alla networks misslyckades
  }
  
  private async loadAdFromNetwork(network: AdNetwork, type: string): Promise<boolean> {
    switch (network.name) {
      case 'Google AdMob':
        return this.loadAdMobAd(type);
      case 'Facebook Audience Network':
        return this.loadFacebookAd(type);
      case 'Adnami Nordic':
        return this.loadAdnamiAd(type);
      default:
        return false;
    }
  }
  
  private async loadAdMobAd(_type: string): Promise<boolean> {
    // AdMob implementation (redan implementerat)
    // const { AdMob } = await import('@capacitor-community/admob');
    // ... existing AdMob code
    return true;
  }
  
  private async loadFacebookAd(_type: string): Promise<boolean> {
    // Facebook Audience Network implementation
    // Kräver @react-native-async-storage/async-storage
    return Math.random() > 0.2; // 80% success rate
  }
  
  private async loadAdnamiAd(_type: string): Promise<boolean> {
    // Adnami integration för nordiska marknaden
    // Högre CPM men lägre fill rate
    return Math.random() > 0.6; // 40% success rate
  }
  
  private moveToNextNetwork() {
    this.currentNetwork = (this.currentNetwork + 1) % AD_NETWORKS.length;
    this.failedAttempts++;
  }
  
  private resetFailureCount() {
    this.failedAttempts = 0;
  }
}

// Export singleton
export const adMediation = new AdMediation();