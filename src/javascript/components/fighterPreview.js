import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });

  // todo: show fighter info (image, name, health, etc.)
  const fighterImage = createFighterImage(fighter);
  const fighterName = createElement({
    tagName: 'div',
    className: 'fighter-name'
  });
  fighterName.innerText = fighter.name;

  const fighterStatContainer = createElement({
    tagName: 'div',
    className: 'fighter-stat__container'
  });
  const fighterHealth = createFighterStat('Health', fighter.health);
  const fighterAttack = createFighterStat('Attack', fighter.attack);
  const fighterDefense = createFighterStat('Defense', fighter.defense);

  fighterStatContainer.appendChild(fighterHealth);
  fighterStatContainer.appendChild(fighterAttack);
  fighterStatContainer.appendChild(fighterDefense);

  fighterElement.appendChild(fighterImage);
  fighterElement.appendChild(fighterName);
  fighterElement.appendChild(fighterStatContainer);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}

export function createFighterStat(name, value) {
  const container = createElement({
    tagName: 'div',
    className: 'fighter-preview__stat__container'
  });
  const statName = createElement({
    tagName: 'div',
    className: 'fighter-preview__stat__tag'
  });

  const statValue = document.createTextNode(`${value} points`);

  statName.innerText = name;

  container.appendChild(statName);
  container.appendChild(statValue);

  return container;
}
