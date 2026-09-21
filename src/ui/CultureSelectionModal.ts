import { GameState } from '../state/GameState';
import { CultureId } from '../data/types';
import { t } from '../i18n';
import { AudioManager } from '../engine/AudioManager';

export class CultureSelectionModal {
  constructor(private container: HTMLElement, private onStart: (cultureId: CultureId) => void, private onBack: () => void) {}

  public show(): void {
    this.container.innerHTML = `
      <div class="settings-modal-overlay"><div class="settings-window culture-selection-window">
        <div class="settings-header"><div><span class="badge">${t('people.badge')}</span><h2>${t('people.title')}</h2></div>
        <button class="btn-close" id="culture-close" aria-label="${t('settings.close')}">&times;</button></div>
        <div class="settings-body"><p class="culture-intro">${t('people.intro')}</p>
          <div class="culture-grid">
            <article class="culture-card culture-card-active"><span class="culture-status">01 · ${t('people.mexicaStatus')}</span><h3>${t('people.mexica')}</h3>
              <p>${t('people.mexicaDesc')}</p><p class="culture-name-note">${t('people.note')}</p>
              <button class="btn-menu-primary" id="culture-preview-mexica">${t('people.mexicaExplore')}</button>
              <p class="culture-preview-note" id="mexica-preview-note" hidden>${t('people.mexicaPreview')}</p></article>
            <article class="culture-card culture-card-active"><span class="culture-status">02 · ${t('people.incaStatus')}</span><h3>${t('people.inca')}</h3><p>${t('people.incaDesc')}</p>
              <button class="btn-menu-primary" id="culture-start-inca">${t('people.incaStart')}</button></article>
            <article class="culture-card culture-card-planned"><span class="culture-status">${t('people.soon')}</span><h3>${t('people.maya')}</h3></article>
          </div><button class="btn-menu-option culture-back" id="culture-back">${t('people.back')}</button>
        </div></div></div>`;
    this.container.querySelector('#culture-preview-mexica')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick();
      const note = this.container.querySelector('#mexica-preview-note') as HTMLElement;
      if (note) note.hidden = false;
    });
    this.container.querySelector('#culture-start-inca')?.addEventListener('click', () => {
      GameState.getInstance().selectCulture('inca'); AudioManager.getInstance().playClick(); this.close(); this.onStart('inca');
    });
    this.container.querySelector('#culture-close')?.addEventListener('click', () => { this.close(); this.onBack(); });
    this.container.querySelector('#culture-back')?.addEventListener('click', () => { this.close(); this.onBack(); });
  }
  public close(): void { this.container.innerHTML = ''; }
}
