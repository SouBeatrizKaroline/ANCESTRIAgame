import './styles/main.css';
import { GameEngine } from './engine/GameEngine';
import { UIManager } from './ui/UIManager';
import { AudioManager } from './engine/AudioManager';
import { applyDocumentLanguage, getLanguage } from './i18n';

window.addEventListener('DOMContentLoaded', () => {
  applyDocumentLanguage(getLanguage());
  const canvasContainer = document.getElementById('game-canvas-container');
  const uiRoot = document.getElementById('ui-root');

  if (!canvasContainer || !uiRoot) {
    console.error('Containers essenciais do DOM não foram encontrados.');
    return;
  }

  let gameEngine: GameEngine | null = null;

  // Criação do UIManager
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
    onStartGame: () => {
      if (!gameEngine) {
        gameEngine = new GameEngine(
          canvasContainer,
          (npcId) => {
            uiManager.openNpcDialogue(npcId);
          },
          (objectId) => {
            uiManager.openObjectInteraction(objectId);
          }
        );
        gameEngine.start();
      }
    }
  });

  // Exibe o menu principal na inicialização
  uiManager.mainMenu.show();

  // Inicia áudio suave na primeira interação do usuário
  const handleFirstInteraction = () => {
    AudioManager.getInstance().playClick();
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
  };
  window.addEventListener('click', handleFirstInteraction);
  window.addEventListener('keydown', handleFirstInteraction);
});
