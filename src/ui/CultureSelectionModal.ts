import { GameState } from '../state/GameState';
import { CultureId } from '../data/types';
import { t } from '../i18n';
import { AudioManager } from '../engine/AudioManager';
import { getLanguage } from '../i18n';
import { PEOPLE_CATALOG } from '../data/peopleCatalog';

export class CultureSelectionModal {
  constructor(private container: HTMLElement, private onStart: (cultureId: CultureId) => void, private onExploreMexica: () => void, private onExploreAndean: () => void, private onExplorePeople: (cultureId: CultureId) => void, private onBack: () => void) {}

  public show(): void {
    const lang = getLanguage();
    const playLabel = lang === 'es' ? 'Explorar prototipo 3D' : lang === 'pt-BR' ? 'Explorar protótipo 3D' : 'Explore 3D prototype';
    const sourceNote = lang === 'es' ? 'Prototipo exploratorio basado en una ficha sociolingüística; no pretende reconstruir una comunidad específica.' : lang === 'pt-BR' ? 'Protótipo exploratório baseado em uma ficha sociolinguística; não pretende reconstruir uma comunidade específica.' : 'Exploratory prototype based on a sociolinguistic profile; it does not claim to reconstruct a specific community.';
    this.container.innerHTML = `
      <div class="settings-modal-overlay"><div class="settings-window culture-selection-window">
        <div class="settings-header"><div><span class="badge">${t('people.badge')}</span><h2>${t('people.title')}</h2></div>
        <button class="btn-close" id="culture-close" aria-label="${t('settings.close')}">&times;</button></div>
        <div class="settings-body"><p class="culture-intro">${t('people.intro')}</p>
          <div class="culture-grid">
            <article class="culture-card culture-card-active"><span class="culture-status">01 · ${t('people.mexicaStatus')}</span><h3>${t('people.mexica')}</h3>
              <p>${t('people.mexicaDesc')}</p><p class="culture-name-note">${t('people.note')}</p>
              <button class="btn-menu-primary" id="culture-start-mexica">${t('people.mexicaStart')}</button>
              <button class="btn-menu-option culture-learn" id="culture-preview-mexica">${t('people.mexicaExplore')}</button>
              </article>
            <article class="culture-card culture-card-active"><span class="culture-status">02 · ${t('people.incaStatus')}</span><h3>${t('people.inca')}</h3><p>${t('people.incaDesc')}</p>
              <button class="btn-menu-primary" id="culture-start-inca">${t('people.incaStart')}</button><button class="btn-menu-option culture-learn" id="culture-preview-inca">${t('people.mexicaExplore')}</button></article>
            ${PEOPLE_CATALOG.filter((item) => item.id !== 'mexica' && item.id !== 'inca').map((item, index) => `<article class="culture-card culture-card-active"><span class="culture-status">${String(index + 3).padStart(2,'0')} · ${playLabel}</span><h3>${item.name[lang]}</h3><p>${item.summary[lang]}</p><p class="culture-name-note">${sourceNote}</p><button class="btn-menu-primary culture-start-generic" data-culture-id="${item.id}">${playLabel}</button><button class="btn-menu-option culture-learn culture-journey-generic" data-culture-id="${item.id}">${t('people.mexicaExplore')}</button></article>`).join('')}
          </div><button class="btn-menu-option culture-back" id="culture-back">${t('people.back')}</button>
        </div></div></div>`;
    this.container.querySelector('#culture-preview-mexica')?.addEventListener('click', () => {
      AudioManager.getInstance().playClick(); this.close(); this.onExploreMexica();
    });
    this.container.querySelector('#culture-start-mexica')?.addEventListener('click', () => {
      GameState.getInstance().selectCulture('mexica'); AudioManager.getInstance().playClick(); this.close(); this.onStart('mexica');
    });
    this.container.querySelector('#culture-start-inca')?.addEventListener('click', () => {
      GameState.getInstance().selectCulture('inca'); AudioManager.getInstance().playClick(); this.close(); this.onStart('inca');
    });
    this.container.querySelector('#culture-preview-inca')?.addEventListener('click', () => { AudioManager.getInstance().playClick(); this.close(); this.onExploreAndean(); });
    this.container.querySelectorAll<HTMLButtonElement>('.culture-start-generic').forEach((button) => button.addEventListener('click', () => {
      const cultureId = button.dataset.cultureId as CultureId;
      GameState.getInstance().selectCulture(cultureId); AudioManager.getInstance().playClick(); this.close(); this.onStart(cultureId);
    }));
    this.container.querySelectorAll<HTMLButtonElement>('.culture-journey-generic').forEach((button) => button.addEventListener('click', () => {
      const cultureId = button.dataset.cultureId as CultureId; AudioManager.getInstance().playClick(); this.close(); this.onExplorePeople(cultureId);
    }));
    this.container.querySelector('#culture-close')?.addEventListener('click', () => { this.close(); this.onBack(); });
    this.container.querySelector('#culture-back')?.addEventListener('click', () => { this.close(); this.onBack(); });
  }
  public close(): void { this.container.innerHTML = ''; }
}
