import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    let firstFighterHealth = firstFighter.health;
    let secondFighterHealth = secondFighter.health;
    let firstFighterBlock = false;
    let secondFighterBlock = false;
    let firstFighterCrit = false;
    let secondFighterCrit = false;
    const pressedKeys = new Set();

    function onKeyUp(event) {
      const firstPlayerAttack = event.code === controls.PlayerOneAttack && !secondFighterBlock && !firstFighterBlock;
      const secondPlayerAttack = event.code === controls.PlayerTwoAttack && !secondFighterBlock && !firstFighterBlock

      if (firstPlayerAttack) {
        secondFighterHealth -= getDamage(firstFighter, secondFighter);
        updateHealthIndicator(secondFighter, secondFighterHealth, 'right');
      }
      if (secondPlayerAttack) {
        firstFighterHealth -= getDamage(secondFighter, firstFighter);
        updateHealthIndicator(firstFighter, firstFighterHealth, 'left');
      }

      if (event.code === controls.PlayerOneBlock) {
        firstFighterBlock = false;
      }
      if (event.code === controls.PlayerTwoBlock) {
        secondFighterBlock = false;
      }

      pressedKeys.delete(event.code);

      if (firstFighterHealth <= 0) {
        resolve(secondFighter);
        document.removeEventListener('keyup', onKeyUp);
        document.removeEventListener('keyup', onKeyPress);
        document.removeEventListener('keydown', onKeyDown);
      }
      if (secondFighterHealth <= 0) {
        resolve(firstFighter);
        document.removeEventListener('keyup', onKeyUp);
        document.removeEventListener('keyup', onKeyPress);
        document.removeEventListener('keydown', onKeyDown);
      }
    }

    function onKeyPress(event) {
      if (event.code === controls.PlayerOneBlock) {
        firstFighterBlock = true;
      }
      if (event.code === controls.PlayerTwoBlock) {
        secondFighterBlock = true;
      }
    }

    function onKeyDown(event) {
      const firstPlayerCritHit = controls.PlayerOneCriticalHitCombination.every((key) => pressedKeys.has(key)) && !firstFighterCrit
      const secondPlayerCritHit = controls.PlayerTwoCriticalHitCombination.every((key) => pressedKeys.has(key)) && !secondFighterCrit

      pressedKeys.add(event.code);

      if (firstPlayerCritHit) {
        secondFighterHealth -= getCritHit(firstFighter);
        updateHealthIndicator(secondFighter, secondFighterHealth, 'right');

        firstFighterCrit = true;
        setTimeout(() => {
          firstFighterCrit = false;
        }, 10000);
      }

      if (secondPlayerCritHit) {
        firstFighterHealth -= getCritHit(secondFighter);
        updateHealthIndicator(firstFighter, firstFighterHealth, 'left');

        secondFighterCrit = true;
        setTimeout(() => {
          secondFighterCrit = false;
        }, 10000);
      }
    }

    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keypress', onKeyPress);
    document.addEventListener('keydown', onKeyDown);

    //Ulta-------------
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return Math.max(0, damage);
}

export function getHitPower(fighter) {
  // return hit power
  return fighter.attack * randomNumber(1, 2);
}

export function getBlockPower(fighter) {
  // return block power
  return fighter.defense * randomNumber(1, 2);
}

function getCritHit(fighter) {
  return fighter.attack * 2;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function updateHealthIndicator(fighter, currentHealth, position) {
  const { health } = fighter;
  const healthBar = document.getElementById(`${position}-fighter-indicator`);
  const healthBarWidth = (100 / health) * currentHealth;

  healthBar.style.width = healthBarWidth < 0 ? 0 : `${healthBarWidth}%`;
}
