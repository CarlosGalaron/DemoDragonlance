import { arrayHeroes, arrayMonsters } from './charFunctions';

// Determina quién actúa primero basado en iniciativa
export const whoIsFirst = (hero, monster) => {
    const heroInitiative = hero.dexterity + hero.intelligence;
    const monsterInitiative = monster.dexterity + monster.intelligence;
    return heroInitiative >= monsterInitiative ? 'player' : 'npc';
};

// Calcula el daño de un ataque
export const calculateDamage = (attacker, target) => {
    const baseDamage = attacker.selectedWeapon.damage + attacker.selectedAbility.damage - target.armor;
    return Math.max(baseDamage, 0); // El daño no puede ser negativo
};

// Determina si un ataque acierta
export const doesHit = (attacker, target) => {
    const dexDiff = attacker.dexterity - target.dexterity;
    const chanceToHit = 50 + dexDiff * 5;
    return chanceToHit >= Math.random() * 100;
};

// Aplica daño al objetivo
export const applyDamage = (target, damage) => {
    const newHp = Math.max(target.currentHp - damage, 0);
    return { ...target, currentHp: newHp };
};

// Evalúa si un personaje ha muerto
export const isDead = (character) => character.currentHp <= 0;

// Cambia al siguiente monstruo
export const changeMonster = (currentMonster, monsters) => {
    const updatedMonsters = monsters.filter((m) => m.name !== currentMonster.name);
    const nextMonster = updatedMonsters[0] || null;
    return { nextMonster, updatedMonsters };
};

// Cambia al siguiente héroe
export const changeHero = (currentHero, heroes) => {
    const updatedHeroes = heroes.filter((h) => h.name !== currentHero.name);
    const nextHero = updatedHeroes[0] || null;
    return { nextHero, updatedHeroes };
};

// Verifica si la partida ha terminado
export const checkGameEnd = (heroes, monsters) => {
    if (monsters.length === 0) return 'heroes';
    if (heroes.length === 0) return 'monsters';
    return null;
};

// Ejecuta un turno completo
export const executeTurn = (hero, monster, heroes, monsters) => {
    let log = [];
    const first = whoIsFirst(hero, monster);

    if (first === 'player') {
        if (doesHit(hero, monster)) {
            const damage = calculateDamage(hero, monster);
            monster = applyDamage(monster, damage);
            log.push(`${hero.name} golpeó a ${monster.name} por ${damage} de daño.`);
        } else {
            log.push(`${hero.name} falló su ataque.`);
        }
        if (isDead(monster)) {
            log.push(`${monster.name} ha muerto.`);
            const result = changeMonster(monster, monsters);
            monster = result.nextMonster;
            monsters = result.updatedMonsters;
        }
    }

    if (monster && !isDead(hero)) {
        if (doesHit(monster, hero)) {
            const damage = calculateDamage(monster, hero);
            hero = applyDamage(hero, damage);
            log.push(`${monster.name} golpeó a ${hero.name} por ${damage} de daño.`);
        } else {
            log.push(`${monster.name} falló su ataque.`);
        }
        if (isDead(hero)) {
            log.push(`${hero.name} ha muerto.`);
            const result = changeHero(hero, heroes);
            hero = result.nextHero;
            heroes = result.updatedHeroes;
        }
    }

    const gameEnd = checkGameEnd(heroes, monsters);
    if (gameEnd) {
        log.push(gameEnd === 'heroes' ? '¡Los héroes han ganado!' : '¡Los monstruos han ganado!');
    }

    return { hero, monster, heroes, monsters, log, gameEnd };
};
