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

    document.addEventListener('keyup', function (event) {
      if (event.code === controls.PlayerOneAttack && !secondFighterBlock && !firstFighterBlock) {
        secondFighterHealth -= getDamage(firstFighter, secondFighter);
        updateHealthIndicator(secondFighter, secondFighterHealth, 'right');
        console.log(secondFighterHealth);
      }
      if (event.code === controls.PlayerTwoAttack && !secondFighterBlock && !firstFighterBlock) {
        firstFighterHealth -= getDamage(secondFighter, firstFighter);
        updateHealthIndicator(firstFighter, firstFighterHealth, 'left')
        console.log(firstFighterHealth);
      }

      if (firstFighterHealth <= 0) {
        resolve(secondFighter);
      }

      if (secondFighterHealth <= 0) {
        resolve(firstFighter);
      }

      if (event.code === controls.PlayerOneBlock) {
        firstFighterBlock = false;
      }
      if (event.code === controls.PlayerTwoBlock) {
        secondFighterBlock = false;
      }
    });

    //Block-------------
    document.addEventListener('keypress', function (event) {
      if (event.code === controls.PlayerOneBlock) {
        firstFighterBlock = true;
      }
      if (event.code === controls.PlayerTwoBlock) {
        secondFighterBlock = true;
      }
    });

    //Ulta-------------
    const mySet = new Set();
    document.addEventListener('keydown', function (event) {
      mySet.add(event.code);

      if (controls.PlayerOneCriticalHitCombination.every((key) => mySet.has(key)) && !firstFighterCrit) {
        secondFighterHealth -= getCritHit(firstFighter);
        updateHealthIndicator(secondFighter, secondFighterHealth, 'right')
        firstFighterCrit = true;
        setTimeout(() => {
          firstFighterCrit = false;
        }, 10000);
        console.log('Ulta!');
      }

      if (controls.PlayerTwoCriticalHitCombination.every((key) => mySet.has(key)) && !secondFighterCrit) {
        firstFighterHealth -= getCritHit(secondFighter);
        updateHealthIndicator(firstFighter, firstFighterHealth, 'left')
        secondFighterCrit = true;
        setTimeout(() => {
          secondFighterCrit = false;
        }, 10000);
        console.log('Ulta!');
      }
    });

    document.addEventListener('keyup', function (event) {
      mySet.delete(event.code);
    });
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

  healthBar.style.width = `${healthBarWidth}%`;
}
