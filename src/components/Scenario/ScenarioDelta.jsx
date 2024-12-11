import React, { useState } from 'react';
import './Scenario.css';
import Sword from '../Sword/Sword.jsx';
import CharCard from '../CharCard/CharCard.jsx';
import { arrayHeroes, arrayMonsters } from '../../modelo/charFunctions';

function Scenario() {

	const [log, setLog] = useState([]);

	const [heroes, setHeroes] = useState(arrayHeroes);
	const [monsters, setMonsters] = useState(arrayMonsters);
	
	const [hero, setHero] = useState({
		...heroes[0],              // Copia las propiedades del primer héroe
		weapon: heroes[0].weapon1,  // Establece el arma por defecto (por ejemplo, weapon1)
		attack: heroes[0].attack1   // Establece la habilidad por defecto (por ejemplo, attack1)
	});

	const [monster, setMonster] = useState({
  ...monsters[0],             // Copia las propiedades del primer monstruo
  weapon: monsters[0].weapon1, // Establece el arma por defecto (por ejemplo, weapon1)
  attack: monsters[0].attack1  // Establece la habilidad por defecto (por ejemplo, attack1)
});


	// Función para manejar el cambio del héroe seleccionado
	const handleHeroChange = (e) => {
		const newHero = heroes.find(hero => hero.name === e.target.value);
		
		setHero({
			...newHero,                // Copia todas las propiedades del nuevo héroe
			weapon: newHero.weapon1,    // Establece el valor de weapon por defecto
			attack: newHero.attack1     // Establece el valor de attack por defecto
		});
	};

  // Función para manejar el cambio del monstruo seleccionado
  const handleMonsterChange = (e) => {
    const newMonster = monsters.find(monster => monster.name === e.target.value);

    setMonster({
      ...newMonster,             // Copia todas las propiedades del nuevo monstruo
      weapon: newMonster.weapon1, // Establece el valor de weapon por defecto
      attack: newMonster.attack1  // Establece el valor de attack por defecto
    });
  };

	const handleHeroDeath = () => {
		// Filtramos el array de héroes para eliminar al héroe muerto
		const remainingHeroes = heroes.filter((h) => h.name !== hero.name);
	
		// Si hay más héroes disponibles, seleccionamos uno nuevo
		if (remainingHeroes.length > 0) {
			const newHero = remainingHeroes[0];  // Tomamos el primer héroe disponible
	
			// Actualizamos el héroe seleccionado y sus atributos
			setHero({
				...newHero,  // Propagamos todos los atributos del nuevo héroe
				weapon: newHero.weapon1,  // Asignamos el primer arma como predeterminada
				ability: newHero.attack1,  // Asignamos la primera habilidad como predeterminada
			});
		} else {
			// Si no hay más héroes, puedes manejar el fin del juego o algún mensaje
			alert("No hay más héroes disponibles. Fin del juego.");
		}
	
		// Actualizamos el array de héroes sin el héroe muerto
		setHeroes(remainingHeroes);
	};

	const handleMonsterDeath = () => {
		// Filtramos el array de monstruos para eliminar al monstruo muerto
		const remainingMonsters = monsters.filter((m) => m.name !== monster.name);
	
		// Si hay más monstruos disponibles, seleccionamos uno nuevo
		if (remainingMonsters.length > 0) {
			const newMonster = remainingMonsters[0];  // Tomamos el primer monstruo disponible
	
			// Actualizamos el monstruo seleccionado y sus atributos
			setMonster({
				...newMonster,  // Propagamos todos los atributos del nuevo monstruo
				weapon: newMonster.weapon1,  // Asignamos el primer arma como predeterminada
				ability: newMonster.attack1,  // Asignamos la primera habilidad como predeterminada
			});
		} else {
			// Si no hay más monstruos, puedes manejar el fin del juego o algún mensaje
			alert("No hay más monstruos disponibles. Fin del juego.");
		}
	
		// Actualizamos el array de monstruos sin el monstruo muerto
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
	const newLog = [...log, hero.name + ' se enfrenta a ' + monster.name];
	setLog(newLog);

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
            <Sword handleTurn={handleLog} />
          </div>
        </div>
        <div className='Scenario-log'>
          {/* Aquí iría el log del combate */}
          {log.map((entry, index) => (
            <div key={index}>{entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Scenario;
