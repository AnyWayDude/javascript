import { createFighterImage } from '../fighterPreview';
import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function
  showModal({
    title: 'Winner',
    bodyElement: createFighterImage(fighter),
    onClose: () => window.location.reload()
  });
}
