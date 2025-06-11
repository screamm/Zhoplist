/**
 * Session Manager för Hybrid SessionID + Lista-kod System
 * 
 * Funktioner:
 * - Automatisk UUID sessionID generation för nya användare
 * - localStorage för persitens
 * - Manuell lista-kod support för multi-enhet användning
 * - Event system för sessionID förändringar
 */

import { v4 as uuidv4 } from 'uuid';

const SESSION_STORAGE_KEY = 'zhoplist-session-id';
const CUSTOM_LIST_CODE_KEY = 'zhoplist-custom-list-code';

export interface SessionInfo {
  sessionId: string;
  isCustomListCode: boolean;
  listName?: string;
}

class SessionManager {
  private currentSessionId: string;
  private isCustomListCode: boolean = false;
  private listeners: ((sessionInfo: SessionInfo) => void)[] = [];

  constructor() {
    this.currentSessionId = this.initializeSession();
    this.checkUrlForListCode();
  }

  private initializeSession(): string {
    // Check för manuell lista-kod först
    const customListCode = localStorage.getItem(CUSTOM_LIST_CODE_KEY);
    if (customListCode) {
      this.isCustomListCode = true;
      return customListCode;
    }

    // Annars använd automatisk sessionID
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
      console.log('🆔 Ny sessionID genererad:', sessionId);
    } else {
      console.log('🆔 Befintlig sessionID hittad:', sessionId);
    }

    this.isCustomListCode = false;
    return sessionId;
  }

  /**
   * Hämta nuvarande sessionID
   */
  getSessionId(): string {
    return this.currentSessionId;
  }

  /**
   * Hämta sessioninfo
   */
  getSessionInfo(): SessionInfo {
    return {
      sessionId: this.currentSessionId,
      isCustomListCode: this.isCustomListCode,
      listName: this.isCustomListCode ? this.currentSessionId : undefined,
    };
  }

  /**
   * Byt till manuell lista-kod
   */
  setCustomListCode(listCode: string): void {
    if (!listCode.trim()) {
      throw new Error('Lista-kod kan inte vara tom');
    }

    const cleanListCode = listCode.trim().toLowerCase();
    
    // Validera lista-kod (endast bokstäver, siffror, bindestreck)
    if (!/^[a-z0-9-]+$/.test(cleanListCode)) {
      throw new Error('Lista-kod får endast innehålla bokstäver, siffror och bindestreck');
    }

    if (cleanListCode.length < 3) {
      throw new Error('Lista-kod måste vara minst 3 tecken');
    }

    this.currentSessionId = cleanListCode;
    this.isCustomListCode = true;

    // Spara båda alternativen
    localStorage.setItem(CUSTOM_LIST_CODE_KEY, cleanListCode);
    
    console.log('🆔 Bytte till manuell lista-kod:', cleanListCode);
    this.notifyListeners();
  }

  /**
   * Byt tillbaka till automatisk sessionID
   */
  clearCustomListCode(): void {
    localStorage.removeItem(CUSTOM_LIST_CODE_KEY);
    
    // Återgå till sparad automatisk sessionID
    let autoSessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!autoSessionId) {
      autoSessionId = uuidv4();
      localStorage.setItem(SESSION_STORAGE_KEY, autoSessionId);
    }

    this.currentSessionId = autoSessionId;
    this.isCustomListCode = false;

    console.log('🆔 Bytte tillbaka till automatisk sessionID:', autoSessionId);
    this.notifyListeners();
  }

  /**
   * Generera ny automatisk sessionID (för "starta om")
   */
  generateNewSession(): void {
    const newSessionId = uuidv4();
    localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
    localStorage.removeItem(CUSTOM_LIST_CODE_KEY);

    this.currentSessionId = newSessionId;
    this.isCustomListCode = false;

    console.log('🆔 Genererad ny sessionID:', newSessionId);
    this.notifyListeners();
  }

  /**
   * Lyssna på sessionID förändringar
   */
  onSessionChange(callback: (sessionInfo: SessionInfo) => void): () => void {
    this.listeners.push(callback);
    
    // Returnera unsubscribe funktion
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    const sessionInfo = this.getSessionInfo();
    this.listeners.forEach(callback => callback(sessionInfo));
  }

  /**
   * Validera om en lista-kod är giltig
   */
  static validateListCode(listCode: string): { valid: boolean; error?: string } {
    if (!listCode.trim()) {
      return { valid: false, error: 'Lista-kod kan inte vara tom' };
    }

    const cleanListCode = listCode.trim().toLowerCase();
    
    if (!/^[a-z0-9-]+$/.test(cleanListCode)) {
      return { valid: false, error: 'Endast bokstäver, siffror och bindestreck tillåtna' };
    }

    if (cleanListCode.length < 3) {
      return { valid: false, error: 'Minst 3 tecken krävs' };
    }

    if (cleanListCode.length > 50) {
      return { valid: false, error: 'Max 50 tecken tillåtna' };
    }

    return { valid: true };
  }

  /**
   * Kolla URL för lista-kod parameter
   */
  private checkUrlForListCode(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const urlListCode = urlParams.get('lista');
    
    if (urlListCode) {
      const validation = SessionManager.validateListCode(urlListCode);
      if (validation.valid) {
        try {
          this.setCustomListCode(urlListCode);
          console.log('🆔 Laddade lista från URL:', urlListCode);
          
          // Rensa URL utan att ladda om sidan
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        } catch (error) {
          console.warn('Kunde inte använda lista-kod från URL:', error);
        }
      } else {
        console.warn('Ogiltig lista-kod i URL:', validation.error);
      }
    }
  }

  /**
   * Föreslå lista-kod baserat på input
   */
  static suggestListCode(input: string): string {
    return input
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();

// Export types och utilities
export { SessionManager }; 