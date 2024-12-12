import React, { useState, useEffect } from 'react';
import './Scenario.css';
import Sword from '../Sword/Sword.jsx';
import CharCard from '../CharCard/CharCard.jsx';
import { arrayHeroes, arrayMonsters } from '../../modelo/charFunctions';

function Scenario() {

	const [turn, setTurn] = useState('hero'); // Puede ser 'hero' o 'monster'


	const [log, setLog] = useState([]);

	const [heroes, setHeroes] = useState(arrayHeroes);
	const [monsters, setMonsters] = useState(arrayMonsters);
	
	const [hero, setHero] = useState({
		...heroes[0],              // Copia las propiedades del primer héroe
		weapon: heroes[0].weapon1,  // Establece el arma por defecto (por ejemplo, weapon1)
		ability: heroes[0].attack1,   // Establece la habilidad por defecto (por ejemplo, attack1)
		armour: heroes[0].armour,  // Establece el armadura por defecto (por ejemplo, armour)
	});

	const [monster, setMonster] = useState({
  ...monsters[0],             // Copia las propiedades del primer monstruo
  weapon: monsters[0].weapon1, // Establece el arma por defecto (por ejemplo, weapon1)
  ability: monsters[0].attack1,  // Establece la habilidad por defecto (por ejemplo, attack1)
  armour: monsters[0].armour,  // Establece el armadura por defecto (por ejemplo, armour)
	});

	//funcion para resetear el juego
	const resetGame = () => {
		setHeroes(arrayHeroes);
		setMonsters(arrayMonsters);
		setHero({
			...heroes[0],              // Copia las propiedades del primer héroe
			weapon: heroes[0].weapon1,  // Establece el arma por defecto (por ejemplo, weapon1)
			ability: heroes[0].attack1,   // Establece la habilidad por defecto (por ejemplo, attack1)
			armour: heroes[0].armour,  // Establece el armadura por defecto (por ejemplo, armour)
		});

		setMonster({
			...monsters[0],             // Copia las propiedades del primer monstruo
			weapon: monsters[0].weapon1, // Establece el arma por defecto (por ejemplo, weapon1)
			ability: monsters[0].attack1,  // Establece la habilidad por defecto (por ejemplo, attack1)
			armour: monsters[0].armour,  // Establece el armadura por defecto (por ejemplo, armour)
		});

		setLog([]);
		setTurn('');
	};

	// Función para verificar el orden de iniciativa
	const checkOrder = () => {
		const heroInitiative = hero.dexterity+hero.intelligence;
		const monsterInitiative = monster.dexterity+monster.intelligence;
		
		if (heroInitiative >= monsterInitiative) {
			setTurn('hero');
		}
		else {
			setTurn('monster');
		}
	};

	useEffect(() => {
		checkOrder(); // Llama a checkOrder para asegurarte del turno correcto
	}, [hero, monster]);


	// Función para manejar el cambio del héroe seleccionado
	const handleHeroChange = (e) => {
		const newHero = heroes.find(hero => hero.name === e.target.value);
		
		setHero({
			...newHero,                // Copia todas las propiedades del nuevo héroe
			weapon: newHero.weapon1,    // Establece el valor de weapon por defecto
			ability: newHero.attack1,     // Establece el valor de attack por defecto
			armour: newHero.armour,     // Establece el valor de armour por defecto
		});
	};

  // Función para manejar el cambio del monstruo seleccionadoque no hace falta de momento
  // const handleMonsterChange = (e) => {
  //   const newMonster = monsters.find(monster => monster.name === e.target.value);

  //   setMonster({
  //     ...newMonster,             // Copia todas las propiedades del nuevo monstruo
  //     weapon: newMonster.weapon1, // Establece el valor de weapon por defecto
  //     ability: newMonster.attack1,  // Establece el valor de attack por defecto
	//   	armour: newMonster.armour,  // Establece el valor de armour por defecto
  //   });
  // };

	const handleHeroDeath = () => {
    const deathLog = `${hero.name} ha muerto.`;
    const endLog = "Todos los héroes han caído. Fin del juego.";
    
    // Agregar el mensaje de muerte al log
    setLog((prevLog) => [...prevLog, deathLog]);

    // Filtrar el array de héroes para eliminar al héroe muerto
    const remainingHeroes = heroes.filter((h) => h.name !== hero.name);

    if (remainingHeroes.length > 0) {
        // Si quedan héroes, seleccionar uno nuevo
        const newHero = remainingHeroes[0];

        setHero({
            ...newHero,
            weapon: newHero.weapon1,
            ability: newHero.attack1,
            armour: newHero.armour,
        });
    } else {
        // Si no quedan héroes, agregar mensaje final al log
        setLog((prevLog) => [...prevLog, endLog]);
        alert(endLog);
        resetGame();
    }

    // Actualizar la lista de héroes restantes
    setHeroes(remainingHeroes);
};

const handleMonsterDeath = () => {
    const deathLog = `${monster.name} ha muerto.`;
    const endLog = "Todos los monstruos han sido derrotados. ¡Has ganado!";
    
    // Agregar el mensaje de muerte al log
    setLog((prevLog) => [...prevLog, deathLog]);

    // Filtrar el array de monstruos para eliminar al monstruo muerto
    const remainingMonsters = monsters.filter((m) => m.name !== monster.name);

    if (remainingMonsters.length > 0) {
        // Si quedan monstruos, seleccionar uno nuevo
        const newMonster = remainingMonsters[0];

        setMonster({
            ...newMonster,
            weapon: newMonster.weapon1,
            ability: newMonster.attack1,
            armour: newMonster.armour,
        });
    } else {
        // Si no quedan monstruos, agregar mensaje final al log
        setLog((prevLog) => [...prevLog, endLog]);
        alert(endLog);
        resetGame();
    }

    // Actualizar la lista de monstruos restantes
    setMonsters(remainingMonsters);
};

	

	// Función para manejar el cambio de arma seleccionada
	const handleWeaponChange = (e) => {
		const selectedWeapon = hero.weapon1.name === e.target.value ? hero.weapon1 : hero.weapon2;
		setHero({
		  ...hero,
		  weapon: selectedWeapon, // Actualiza el arma del héroe
		});
	  };

	// Función para manejar el cambio de habilidad seleccionada
	const handleAbilityChange = (e) => {
		const selectedAbility = hero.attack1.name === e.target.value ? hero.attack1 : hero.attack2;
		setHero({
			...hero,
			ability: selectedAbility, // Actualiza la habilidad del héroe
		});
	};

	//funcion para manejar el log
	const handleLog = () => {
		const testLog = ('esto es una prueba del log');	
		setLog(testLog);

	};

	const calculateDamage = (weapon, ability, armour) => {
		return Math.max(weapon.damage + ability.damage - armour, 0); // Calcula el daño teniendo en cuenta el ataque y el arma.
  };
  

//funcion para manejar el turno del héroe
const handleHeroAttack = () => {
	const damage = calculateDamage(hero.weapon, hero.ability , monster.armour);
	const newMonsterHp = monster.currentHp - damage;

	const attackLog = `${hero.name} atacó a ${monster.name} con ${hero.ability.name}, causando ${damage} de daño.`;
  setLog((prevLog) => [...prevLog, attackLog]);
	
	if (newMonsterHp <= 0) {
	  handleMonsterDeath(); // Si el monstruo muere, se realiza la acción de muerte
	} else {
	  setMonster(prev => ({ ...prev, currentHp: newMonsterHp })); // Actualiza el HP del monstruo
	}
};

//funcion para manejar el turno del monstruo
const handleMonsterAttack = () => {

	const damage = calculateDamage(monster.weapon, monster.ability, hero.armour);
	const newHeroHp = hero.currentHp - damage;

	const attackLog = `${monster.name} atacó a ${hero.name} con ${monster.ability.name}, causando ${damage} de daño.`;
  setLog((prevLog) => [...prevLog, attackLog]);
		
	if (newHeroHp <= 0) {
		handleHeroDeath(); // Si el héroe muere, se realiza la acción de muerte
	} else {
		setHero(prev => ({ ...prev, currentHp: newHeroHp })); // Actualiza el HP del héroe
	}
		

};
 
  
//funcion principal de combate
const combatTurn = () => {
	const newLog = [...log, hero.name + ' se enfrenta a ' + monster.name];
	setLog((prevLog) => [...prevLog, newLog]);
	checkOrder(hero, monster);
	if (turn === 'hero') {
	  // Ataque del héroe
	  handleHeroAttack();
	} else {
	  // Ataque del monstruo
	  handleMonsterAttack();
	}
	handleLog();
	// Cambiar de turno
	setTurn(turn === 'hero' ? 'monster' : 'hero');
  };

  const writeLog = () => {
	return log.map((entry, index) => (
	  <p key={index}>{entry}</p> // Asegúrate de envolver cada entrada en un elemento JSX válido, como un <p>
	));
  };

  return (
    <div className='Scenario-father'>
      <div className='Scenario-card-board'>
        <CharCard character={hero} />
        <CharCard character={monster} />
      </div>
      <div className='Scenario-buttons-and-log'>
        <div className='Scenario-buttons'>
          <div className='combat-selector-father'>
            <div className='action-buttons'>
              <div className='combat-labels-container'>
                <h1 className='combat-label'>Personaje:</h1>
                <h1 className='combat-label'>Arma:</h1>
                <h1 className='combat-label'>Habilidad:</h1>
              </div>
              <div className='combat-selector-container'>
                {/* Selector de Personaje */}
                <select className='combat-selector' onChange={handleHeroChange} value={hero.name}>
    							{heroes.map((hero) => (
      							<option key={hero.name} value={hero.name}>{hero.name}</option>
    							))}
  							</select>

                {/* Selector de Armas */}
									<select className='combat-selector' onChange={handleWeaponChange} value={hero.weapon.name}>
										<option value={hero.weapon1.name}>{hero.weapon1.name}</option>
										<option value={hero.weapon2.name}>{hero.weapon2.name}</option>
									</select>

                {/* Selector de Habilidades */}
									<select className='combat-selector' onChange={handleAbilityChange} value={hero.attack1.name}>
										<option value={hero.attack1.name}>{hero.attack1.name}</option>
										<option value={hero.attack2.name}>{hero.attack2.name}</option>
									</select>
              </div>
            </div>
          </div>
          <div className='action-container'>
            <div className='change-button' onClick={handleLog}>Continuar</div>
            <Sword combatTurn={combatTurn} />
          </div>
        </div>
        <div className='Scenario-log'>
          {/* Aquí iría el log del combate */}
          {writeLog(log)}</div>          
        </div>
      </div>
    
  );
}

export default Scenario;
