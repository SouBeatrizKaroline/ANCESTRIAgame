import { CultureId, Language } from './types';
import { PEOPLE_CATALOG } from './peopleCatalog';

export const JOURNEY_ORDER: CultureId[] = [
  'mexica', 'inca', 'quechua', 'aymara', 'zapotec', 'raramuri', 'bribri',
  'wayuu', 'warao', 'yanomami', 'guarani', 'tupinamba', 'xukuru'
];

export type JourneyStatus = 'available' | 'in_progress' | 'completed' | 'locked';
export interface JourneyProgress {
  completed: number;
  total: number;
  unlocked: boolean;
  status: JourneyStatus;
  prerequisite?: CultureId;
}

const has = (key: string) => localStorage.getItem(key) !== null;
const numeric = (key: string, max: number) => Math.min(Math.max(Number(localStorage.getItem(key) || 0), 0), max);

function genericChapters(cultureId: CultureId): number {
  const legacy = numeric(`ancestria_people_journey_${cultureId}_v1`, 5);
  let count = 0;
  for (let i = 0; i < 5; i++) {
    if (i < legacy || has(`ancestria_people_journey_${cultureId}_v1_chapter_${i}`)) count++;
  }
  return count;
}

export function getJourneyCompletion(cultureId: CultureId, discoveries: string[] = []): { completed: number; total: number } {
  if (cultureId === 'mexica') {
    const finds = ['mexica_chinampas', 'mexica_causeway', 'mexica_templo'].filter((id) => has(`ancestria_find_${id}`)).length;
    const dialogues = ['npc_mexica_chinampa', 'npc_mexica_market', 'npc_mexica_language'].filter((id) => has(`ancestria_dialogue_${id}`)).length;
    return { completed: finds + dialogues + numeric('ancestria_mexica_journey_v1', 5), total: 11 };
  }
  if (cultureId === 'inca') {
    const keyDiscoveries = ['disc_intihuatana', 'disc_qullqa', 'disc_andenes', 'disc_qeswachaka'].filter((id) => discoveries.includes(id)).length;
    return { completed: keyDiscoveries + numeric('ancestria_andean_journey_v1', 5), total: 9 };
  }
  const objects = [0, 1, 2].filter((i) => has(`ancestria_find_people_${cultureId}_${i}`)).length;
  const dialogue = has(`ancestria_dialogue_npc_people_${cultureId}`) ? 1 : 0;
  return { completed: objects + dialogue + genericChapters(cultureId), total: 9 };
}

export function getPrototypeCompletion(cultureId: CultureId, discoveries: string[] = []): { completed: number; total: number } {
  if (cultureId === 'mexica') {
    const finds = ['mexica_chinampas', 'mexica_causeway', 'mexica_templo'].filter((id) => has(`ancestria_find_${id}`)).length;
    const dialogues = ['npc_mexica_chinampa', 'npc_mexica_market', 'npc_mexica_language'].filter((id) => has(`ancestria_dialogue_${id}`)).length;
    return { completed: finds + dialogues, total: 6 };
  }
  if (cultureId === 'inca') {
    return { completed: ['disc_intihuatana', 'disc_qullqa', 'disc_andenes', 'disc_qeswachaka'].filter((id) => discoveries.includes(id)).length, total: 4 };
  }
  const objects = [0, 1, 2].filter((i) => has(`ancestria_find_people_${cultureId}_${i}`)).length;
  const dialogue = has(`ancestria_dialogue_npc_people_${cultureId}`) ? 1 : 0;
  return { completed: objects + dialogue, total: 4 };
}

export function getJourneyProgress(cultureId: CultureId, discoveries: string[] = [], selected?: CultureId): JourneyProgress {
  const index = JOURNEY_ORDER.indexOf(cultureId);
  const completion = getJourneyCompletion(cultureId, discoveries);
  const prerequisite = index > 0 ? JOURNEY_ORDER[index - 1] : undefined;
  const priorComplete = prerequisite ? (() => { const p = getJourneyCompletion(prerequisite, discoveries); return p.completed >= p.total; })() : true;
  const persisted = has(`ancestria_journey_unlocked_${cultureId}`);
  const playedBefore = completion.completed > 0 || selected === cultureId;
  const unlocked = index === 0 || priorComplete || persisted || playedBefore;
  if (unlocked) localStorage.setItem(`ancestria_journey_unlocked_${cultureId}`, '1');
  if (completion.completed >= completion.total) return { ...completion, unlocked: true, status: 'completed', prerequisite };
  if (completion.completed > 0) return { ...completion, unlocked: true, status: 'in_progress', prerequisite };
  return { ...completion, unlocked, status: unlocked ? 'available' : 'locked', prerequisite };
}

export function journeyName(cultureId: CultureId, language: Language): string {
  return PEOPLE_CATALOG.find((item) => item.id === cultureId)?.name[language] || cultureId;
}
