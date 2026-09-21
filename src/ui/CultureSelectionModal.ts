import { GameState } from '../state/GameState';
import { CultureId } from '../data/types';
import { t, getLanguage } from '../i18n';
import { AudioManager } from '../engine/AudioManager';
import { PEOPLE_CATALOG } from '../data/peopleCatalog';
import { getJourneyProgress, JOURNEY_ORDER, journeyName } from '../data/journeyProgress';

export class CultureSelectionModal {
  constructor(private container: HTMLElement, private onStart: (cultureId: CultureId) => void, private onExploreMexica: () => void, private onExploreAndean: () => void, private onExplorePeople: (cultureId: CultureId) => void, private onBack: () => void) {}

  public show(): void {
    const lang = getLanguage();
    const state = GameState.getInstance();
    const copy = lang === 'es'
      ? { intro:'Avanza recorrido por recorrido. Completar las memorias de un pueblo abre el siguiente; lo ya recorrido siempre puede volver a jugarse sin repetir recompensas.', order:'El orden es una ruta educativa curatorial, no una jerarquía entre pueblos.', available:'Disponible', progress:'En curso', complete:'Completado', locked:'Bloqueado', memories:'memorias', play:'Explorar prototipo 3D', replay:'Volver a explorar', learn:'Abrir recorrido educativo', continue:'Continuar recorrido', requires:'Completa primero' }
      : lang === 'pt-BR'
        ? { intro:'Avance percurso por percurso. Completar as memórias de um povo libera o seguinte; o que já foi percorrido pode ser jogado novamente sem repetir recompensas.', order:'A ordem é uma rota educativa curatorial, não uma hierarquia entre povos.', available:'Disponível', progress:'Em andamento', complete:'Concluído', locked:'Bloqueado', memories:'memórias', play:'Explorar protótipo 3D', replay:'Explorar novamente', learn:'Abrir percurso educativo', continue:'Continuar percurso', requires:'Conclua primeiro' }
        : { intro:'Advance one journey at a time. Completing one people’s memories unlocks the next; completed journeys remain replayable without duplicate rewards.', order:'The order is a curated learning route, not a hierarchy among peoples.', available:'Available', progress:'In progress', complete:'Completed', locked:'Locked', memories:'memories', play:'Explore 3D prototype', replay:'Explore again', learn:'Open learning journey', continue:'Continue journey', requires:'Complete first' };

    const cards = JOURNEY_ORDER.map((cultureId, index) => {
      const profile = PEOPLE_CATALOG.find((item) => item.id === cultureId)!;
      const progress = getJourneyProgress(cultureId, state.unlockedDiscoveryIds, state.selectedCultureId);
      const statusLabel = progress.status === 'completed' ? copy.complete : progress.status === 'in_progress' ? copy.progress : progress.status === 'locked' ? copy.locked : copy.available;
      const primary = progress.status === 'completed' ? copy.replay : progress.status === 'in_progress' ? copy.continue : copy.play;
      const prerequisite = progress.prerequisite ? journeyName(progress.prerequisite, lang) : '';
      return `<article class="culture-card ${progress.unlocked ? 'culture-card-active' : 'culture-card-locked'}" data-route-step="${index + 1}">
        <div class="journey-card-heading"><span class="culture-status">${String(index + 1).padStart(2,'0')} · ${statusLabel}</span><strong>${progress.completed}/${progress.total}</strong></div>
        <h3>${profile.name[lang]}</h3>${progress.unlocked ? `<p>${profile.summary[lang]}</p><div class="journey-meter" aria-label="${progress.completed}/${progress.total} ${copy.memories}"><span style="width:${(progress.completed/progress.total)*100}%"></span></div>` : `<p class="locked-route-hint">${copy.requires}: ${prerequisite}</p>`}
        ${progress.unlocked
          ? `<button class="btn-menu-primary culture-start-any" data-culture-id="${cultureId}">${primary}</button><button class="btn-menu-option culture-learn culture-journey-any" data-culture-id="${cultureId}">${copy.learn}</button>`
          : `<span class="route-lock" aria-hidden="true">🔒</span>`}
      </article>`;
    }).join('');

    this.container.innerHTML = `<div class="settings-modal-overlay"><div class="settings-window culture-selection-window">
      <div class="settings-header"><div><span class="badge">${t('people.badge')}</span><h2>${t('people.title')}</h2></div><button class="btn-close" id="culture-close" aria-label="${t('settings.close')}">&times;</button></div>
      <div class="settings-body"><p class="culture-intro">${copy.intro}</p><p class="journey-order-note">${copy.order}</p><div class="culture-grid">${cards}</div><button class="btn-menu-option culture-back" id="culture-back">${t('people.back')}</button></div>
    </div></div>`;

    this.container.querySelectorAll<HTMLButtonElement>('.culture-start-any').forEach((button) => button.addEventListener('click', () => {
      const id = button.dataset.cultureId as CultureId; GameState.getInstance().selectCulture(id); AudioManager.getInstance().playClick(); this.close(); this.onStart(id);
    }));
    this.container.querySelectorAll<HTMLButtonElement>('.culture-journey-any').forEach((button) => button.addEventListener('click', () => {
      const id = button.dataset.cultureId as CultureId; AudioManager.getInstance().playClick(); this.close();
      if (id === 'mexica') this.onExploreMexica(); else if (id === 'inca') this.onExploreAndean(); else this.onExplorePeople(id);
    }));
    this.container.querySelector('#culture-close')?.addEventListener('click', () => { this.close(); this.onBack(); });
    this.container.querySelector('#culture-back')?.addEventListener('click', () => { this.close(); this.onBack(); });
  }
  public close(): void { this.container.innerHTML = ''; }
}
