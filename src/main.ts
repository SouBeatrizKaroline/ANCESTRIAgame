import { GameEngine } from './engine/GameEngine';
import { UIManager } from './ui/UIManager';
import { AudioManager } from './engine/AudioManager';
import { applyDocumentLanguage, getLanguage } from './i18n';
import { CultureId } from './data/types';

window.addEventListener('DOMContentLoaded', () => {
  applyDocumentLanguage(getLanguage());

  const canvasContainer = document.getElementById('game-canvas-container') as HTMLElement;
  const uiRoot = document.getElementById('ui-root') as HTMLElement;

  if (!canvasContainer || !uiRoot) {
    console.error('No se encontraron los contenedores esenciales del juego.');
    return;
  }

  let gameEngine: GameEngine | null = null;

  const uiManager = new UIManager(uiRoot, {
    onVirtualMove: (dx, dz) => {
      if (gameEngine) {
        gameEngine.playerController.setVirtualMove(dx, dz);
      }
    },
    onInteract: () => {
      if (gameEngine) {
        gameEngine.playerController.interact();
      }
    },
    onJump: () => {
      if (gameEngine) {
        gameEngine.playerController.jump();
      }
    },
    onStartGame: (cultureId: CultureId) => {
      if (gameEngine) gameEngine.destroy();
      gameEngine = new GameEngine(
        canvasContainer,
        cultureId,
        (npcId) => {
          uiManager.openNpcDialogue(npcId);
        },
        (objectId) => {
          uiManager.openObjectInteraction(objectId);
        }
      );
      gameEngine.start();
    }
  });

  // Habilita audio al primer clic o interacción táctil del usuario
  const initAudioOnUserGesture = () => {
    AudioManager.getInstance();
    window.removeEventListener('click', initAudioOnUserGesture);
    window.removeEventListener('touchstart', initAudioOnUserGesture);
  };
  window.addEventListener('click', initAudioOnUserGesture, { once: true });
  window.addEventListener('touchstart', initAudioOnUserGesture, { once: true });
});
