import RaistlinPortrait from '../images/Raistlin.png'
import CaramonPortrait from '../images/Caramon.png'
import SturmPortrait from '../images/Sturm.png'
import DraconianoPortrait from '../images/Draconiano.png'
import MagoOscuroPortrait from '../images/MagoOscuro.png'
import MinotauroPortrait from '../images/Minotauro.png'
import EvilFranPortrait from '../images/FranEvil.png'


//charFunctions.js
//Tiradas de dados
export const d4 = () => Math.floor(Math.random() * 4) + 1;
export const d6 = () => Math.floor(Math.random() * 6) + 1;
export const d8 = () => Math.floor(Math.random() * 8) + 1;
export const d10 = () => Math.floor(Math.random() * 10) + 1;
export const d12 = () => Math.floor(Math.random() * 12) + 1;      
export const d20 = () => Math.floor(Math.random() * 20) + 1;

// Molde de personaje como función generadora
export const createCharacter = () => ({
    name: 'CharacterName',
    portrait: '',
    strength: 10,
    dexterity: 10,
    intelligence: 10,
    wisdom: 10,
    constitution: 10,
    charisma: 10,
    armor: 10,
    maxHp: null,
    currentHp: null,
    weapon1: null,
    weapon2: null,
    attack1: null,
    attack2: null,
  });

// Calcular vida máxima
export function calculateMaxHp(character) {
    character.maxHp = 20 + character.constitution;
    character.currentHp = character.maxHp;
    }

export function calculateAttackDamage(character, attackType, weaponSlot) {
    const attack = character[attackType]; // Selección del ataque
    const weapon = character[weaponSlot]; // Selección del arma

    if (!attack || !weapon) {
        console.error("Ataque o arma no válidos.");
        return 0;
    }

    // Daño base: suma del daño del arma y el ataque
    const baseDamage = weapon.damage + attack.damage;

    // Aplicar modificador del ataque
    const totalDamage = baseDamage * attack.damageMod;

    console.log(
        `${character.name} usa ${attack.name} con ${weapon.name} e inflige ${totalDamage} de daño.`
    );

    return totalDamage;            
}

//Construimos los personajes
export const Raistlin = {
    ...createCharacter(),
    name: 'Raistlin',
    type: 'player',
    portrait: RaistlinPortrait,
    strength: 8,
    dexterity: 12,
    intelligence: 18,
    wisdom: 18,
    constitution: 10,
    charisma: 10,
    maxHp: null, //calcular al ppio del combate
    currentHp: null, //calcular tras cada ataque recibido
    armor: 8,
    weapon1: {
        name: 'Bastón de mago',
        damage: 2 * d6() + 2,
      },
      weapon2: {
        name: 'Daga',
        damage: d4(),
      },
      attack1: {
        name: 'Golpe',
        damageMod: 1,
        damage: d6() + 8 / 4, // strength de Raistlin
      },
      attack2: {
        name: 'Proyectiles mágicos',
        damageMod: 1,
        damage: 4 * (d4() + 18 / 4), // intelligence de Raistlin
      },
};



export const Caramon = {
    ...createCharacter(),
    name: 'Caramon',
    type: 'player',
    portrait: CaramonPortrait,
    strength: 18,
    dexterity: 18,
    intelligence: 8,
    wisdom: 8,
    constitution: 14,
    charisma: 10,
    maxHp: null, // calcular al inicio del combate
    currentHp: null, // calcular tras cada ataque recibido
    armor: 12,
    weapon1: {
      name: 'Mandoble',
      damage: 1 * d10(),
    },
    weapon2: {
      name: 'Daga',
      damage: d4(),
    },
    attack1: {
      name: 'Golpe',
      damageMod: 1,
      damage: d6() + 18 / 4, // strength de Caramon
    },
    attack2: {
      name: 'Embestida',
      damageMod: 1.5,
      damage: d6() + 18 / 4, // strength de Caramon
    },
  };
  
  export const Sturm = {
    ...createCharacter(),
    name: 'Sturm',
    type: 'player',
    portrait: SturmPortrait,
    strength: 14,
    dexterity: 18,
    intelligence: 10,
    wisdom: 8,
    constitution: 18,
    charisma: 12,
    maxHp: null, // calcular al inicio del combate
    currentHp: null, // calcular tras cada ataque recibido
    armor: 14,
    weapon1: {
      name: 'Mandoble',
      damage: 1 * d10(),
    },
    weapon2: {
      name: 'Daga',
      damage: d4(),
    },
    attack1: {
      name: 'Golpe',
      damageMod: 1,
      damage: d6() + 14 / 4, // strength de Sturm
    },
    attack2: {
      name: 'Finta y corte',
      damageMod: 1,
      damage: 2 * d4() + 18 / 4, // dexterity de Sturm
    },
  };
  
  export const Draconiano = {
    ...createCharacter(),
    name: 'Draconiano',
    type: 'monster',
    portrait: DraconianoPortrait,
    strength: 14,
    dexterity: 12,
    intelligence: 10,
    wisdom: 10,
    constitution: 12,
    charisma: 10,
    maxHp: null, // calcular al inicio del combate
    currentHp: null, // calcular tras cada ataque recibido
    armor: 10,
    weapon1: {
      name: 'Espada corta',
      damage: d6(),
    },
    weapon2: {
      name: 'Daga',
      damage: d4(),
    },
    attack1: {
      name: 'Golpe',
      damageMod: 1,
      damage: d6() + 14 / 4, //fuerza de Draconiano
    },
    attack2: {
      name: 'Frenesí',
      damageMod: 1,
      damage: 2 * d4() + 14 / 4, //fuerza de Draconiano
    },
  };

  export const Minotauro = {
    ...createCharacter(),
    name: 'Minotauro',
    type: 'monster',
    portrait: MinotauroPortrait,
    strength: 18,
    dexterity: 10,
    intelligence: 10,
    wisdom: 10,
    constitution: 18,
    charisma: 10,
    maxHp: null, // calcular al inicio del combate
    currentHp: null, // calcular tras cada ataque recibido
    armor: 10,
    weapon1: {
      name: 'Hacha',
      damage: d8(),
    },
    weapon2: {
      name: 'Cuernos',
      damage: d4(),
    },
    attack1: {
      name: 'Golpe',
      damageMod: 1,
      damage: d6() + 18 / 4, //fuerza de Minotauro
    },
    attack2: {
      name: 'Embestida',
      damageMod: 1.5,
      damage: d6() + 18 / 4, // strength de Minotauro
    },
  };

  export const MagoOscuro = {
    ...createCharacter(),
    name: 'Tunica negra',
    type: 'monster',
    portrait: MagoOscuroPortrait,
    strength: 10,
    dexterity: 10,
    intelligence: 16,
    wisdom: 16,
    constitution: 10,
    charisma: 14,
    maxHp: null, // calcular al inicio del combate
    currentHp: null, // calcular tras cada ataque recibido
    armor: 10,
    weapon1: {
      name: 'Bastón de mago',
      damage: 2 * d6(),
    },
    weapon2: {
      name: 'Daga',
      damage: d4(),
    },
    attack1: {
      name: 'Golpe',
      damageMod: 1,
      damage: d6() + 8 / 4, // strength de MagoOscuro
    },
    attack2: {
      name: 'Proyectiles mágicos',
      damageMod: 1,
      damage: 4 * (d4() + 16 / 4), // intelligence de MagoOscuro
    },
  };

  export const EvilFran = {
    ...createCharacter(),
    name: 'Evil Fran',
    type: 'monster',
    portrait: EvilFranPortrait,
    strength: 20,
    dexterity: 20,
    intelligence: 20,
    wisdom: 20,
    constitution: 20,
    charisma: 20,
    maxHp: null, // calcular al inicio del combate
    currentHp: null, // calcular tras cada ataque recibido
    armor: 20,
    weapon1: {
      name: 'Suspenso',
      damage: 20 * d6(),
    },
    weapon2: {
      name: 'Deberes',
      damage: 10 * d4(),
    },
    attack1: {
      name: 'Suspenso',
      damageMod: 1,
      damage: d6() + 8 / 4,
    },
    attack2: {
      name: 'Deberes',
      damageMod: 1,
      damage: (d4() + 16 / 4),
    },
  }
export const characterArray = [Raistlin, Caramon, Sturm, Draconiano, Minotauro, MagoOscuro];

export const initializeCharacter = (character) => {
    character.maxHp = 20 + character.constitution;
    character.currentHp = character.maxHp;
    return character;
  };

  export const arrayHeroes = [
    initializeCharacter(Raistlin),
    initializeCharacter(Caramon),
    initializeCharacter(Sturm)
  ];
  
  export const arrayMonsters = [
    initializeCharacter(Draconiano),
    initializeCharacter(Minotauro),
    initializeCharacter(MagoOscuro),
    // initializeCharacter(EvilFran),
  ];





