import { CultureId } from '../data/types';
import { getLanguage } from '../i18n';
import { PEOPLE_CATALOG } from '../data/peopleCatalog';
import { getJourneyProgress, JOURNEY_ORDER, journeyName } from '../data/journeyProgress';
import { GameState } from '../state/GameState';
import { AudioManager } from '../engine/AudioManager';

export class PrototypeCompleteModal {
  constructor(private container: HTMLElement, private onContinue: () => void, private onExit: () => void, private onEducation: (id: CultureId) => void, private onNext: (id: CultureId) => void) {}

  public show(cultureId: CultureId): void {
    const lang = getLanguage(), state = GameState.getInstance();
    const profile = PEOPLE_CATALOG.find((item) => item.id === cultureId)!;
    const journey = getJourneyProgress(cultureId, state.unlockedDiscoveryIds, state.selectedCultureId);
    const index = JOURNEY_ORDER.indexOf(cultureId), next = JOURNEY_ORDER[index + 1];
    const full = journey.completed >= journey.total;
    const copy = lang === 'es'
      ? { badge:'PROTOTIPO 3D COMPLETADO', title:'Has recorrido las memorias esenciales del mapa', explored:'Puedes seguir explorando libremente. Las interacciones ya completadas no vuelven a otorgar fragmentos.', pending:'Para cerrar todo el recorrido y liberar el siguiente, completa las memorias educativas pendientes.', complete:'El recorrido completo está terminado. Ya puedes avanzar al siguiente pueblo.', education:'Completar recorrido educativo', next:'Ir al siguiente recorrido', continue:'Continuar explorando', exit:'Salir al menú', last:'Has completado el último recorrido disponible.' }
      : lang === 'pt-BR'
        ? { badge:'PROTÓTIPO 3D CONCLUÍDO', title:'Você percorreu as memórias essenciais do mapa', explored:'Você pode continuar explorando livremente. As interações já concluídas não concedem fragmentos novamente.', pending:'Para concluir todo o percurso e liberar o próximo, complete as memórias educativas pendentes.', complete:'O percurso completo foi concluído. Você já pode avançar para o próximo povo.', education:'Completar percurso educativo', next:'Ir para o próximo percurso', continue:'Continuar explorando', exit:'Sair para o menu', last:'Você concluiu o último percurso disponível.' }
        : { badge:'3D PROTOTYPE COMPLETED', title:'You explored the map’s essential memories', explored:'You may continue exploring freely. Completed interactions do not award fragments again.', pending:'To finish the full journey and unlock the next one, complete the remaining learning memories.', complete:'The full journey is complete. You can now move to the next people.', education:'Complete learning journey', next:'Go to next journey', continue:'Keep exploring', exit:'Exit to menu', last:'You completed the last available journey.' };

    this.container.innerHTML = `<div class="prototype-complete-overlay"><article class="prototype-complete-card"><span class="completion-symbol">✦</span><span class="badge">${copy.badge}</span><h2>${copy.title}</h2><h3>${profile.name[lang]}</h3><p>${copy.explored}</p><aside>${full ? (next ? `${copy.complete} ${journeyName(next, lang)}.` : copy.last) : copy.pending}</aside><div class="prototype-complete-actions">${full && next ? `<button class="btn-menu-primary" id="prototype-next">${copy.next} →</button>` : !full ? `<button class="btn-menu-primary" id="prototype-education">${copy.education} →</button>` : ''}<button class="btn-menu-option" id="prototype-continue">${copy.continue}</button><button class="prototype-exit" id="prototype-exit">${copy.exit}</button></div></article></div>`;
    this.container.querySelector('#prototype-next')?.addEventListener('click',()=>{AudioManager.getInstance().playClick();this.close();if(next)this.onNext(next);});
    this.container.querySelector('#prototype-education')?.addEventListener('click',()=>{AudioManager.getInstance().playClick();this.close();this.onEducation(cultureId);});
    this.container.querySelector('#prototype-continue')?.addEventListener('click',()=>{AudioManager.getInstance().playClick();this.close();this.onContinue();});
    this.container.querySelector('#prototype-exit')?.addEventListener('click',()=>{AudioManager.getInstance().playClick();this.close();this.onExit();});
  }
  private close(): void { this.container.innerHTML=''; }
}
