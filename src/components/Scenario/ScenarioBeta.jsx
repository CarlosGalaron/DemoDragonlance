import React from 'react'
import { useState, useEffect } from 'react'
import './Scenario.css'
import Sword from '../Sword/Sword.jsx'
import CharCard from '../CharCard/CharCard.jsx'
import { arrayHeroes, arrayMonsters } from '../../modelo/charFunctions'


function ScenarioBeta() {

	const [log, setLog] = useState([]);

	// Función para agregar mensajes al log
	const addLogMessage = (message) => {
    setLog(prevLog => [...prevLog, message]); // Agrega el mensaje al estado
  }

	//declaramos al heroes con sus valores iniciales por defecto
	const [hero, setHero] = useState({
    ...arrayHeroes[0],
    selectedWeapon: arrayHeroes[0].weapon1,
    selectedAbility: arrayHeroes[0].attack1,
	});

	//declaramos al monstruo con sus valores iniciales por defecto
	const [monster, setMonster] = useState({
		...arrayMonsters[0],
		selectedWeapon: arrayMonsters[0].weapon1,
		selectedAbility: arrayMonsters[0].attack1,
	});

	const [remainingMonsters, setRemainingMonsters] = useState([...arrayMonsters]); // Copia del array inicial
	const [remainingHeroes, setRemainingHeroes] = useState([...arrayHeroes]); // Copia del array inicial

	const [turn, setTurn] = useState(0);	
	const [playerIsFirst, setPlayerIsFirst] = useState('');

	// Función para cambiar el héroe seleccionado
	const handleHeroChange = (event) => {
    const selectedHero = arrayHeroes.find((hero) => hero.name === event.target.value);
    if (selectedHero) setHero(selectedHero); // Solo actualiza si encuentra el héroe.
  };

	// Función para cambiar el arma seleccionada del héroe
	const handleWeaponChange = (event) => {
    const selectedWeapon = hero.weapon1.name === event.target.value 
        ? hero.weapon1 
        : hero.weapon2;

    setHero(prevHero => ({
        ...prevHero, // Mantén las propiedades existentes del héroe
        selectedWeapon // Actualiza el arma seleccionada
    }));
	};

	// Función para cambiar la habilidad seleccionada del héroe
	const handleAbilityChange = (event) => {
		const selectedAbility = hero.attack1.name === event.target.value 
				? hero.attack1 
				: hero.attack2;

			setHero(prevHero => ({
					...prevHero,
					selectedAbility // Actualiza la habilidad seleccionada
			}));
	};

  //reseteamos el juego
  const resetGame = () => {
    setHero({
      ...arrayHeroes[0],
      selectedWeapon: arrayHeroes[0].weapon1,
      selectedAbility: arrayHeroes[0].attack1,
    });
    setMonster({
      ...arrayMonsters[0],
      selctedWeapon: arrayMonsters[0].weapon1,
      selectedAbility: arrayMonsters[0].attack1,
    });
    setRemainingHeroes([...arrayHeroes]);
    setRemainingMonsters([...arrayMonsters]);
		setLog([]);    
  };

  const checkCombatOrder = () => {
    const heroInitiative = hero.dexterity + hero.intelligence;
    const monsterInitiative = monster.dexterity + monster.intelligence;

    if (heroInitiative >= monsterInitiative) {
        setPlayerIsFirst('hero'); // Actualiza el estado correctamente
        console.log("El héroe va primero");
    } else {
        setPlayerIsFirst('monster'); // Actualiza el estado correctamente
        console.log("El monstruo va primero");
    }
	};

	//calculamos el daño del héroe
	const calculateHeroAttackDamage = () => {  
		const heroDamage = hero.selectedWeapon.damage + hero.selectedAbility.damage;
		console.log(`${hero.name} hara ${heroDamage} de daño si acierta`);		
		return heroDamage;
	};

	//calculamos el daño del monstruo
	const calculateMonsterAttackDamage = () => {
		const monsterDamage = monster.selectedWeapon.damage + monster.selectedAbility.damage;
		console.log(`${monster.name} hara ${monsterDamage} de daño si acierta`);		
		return monsterDamage;
	};
	

	//comprobamos si el héroe golpea al monstruo
	const calculateIfHeroHitsMonster = () => {
		let dexDiff = hero.dexterity - monster.dexterity;
		let chanceToHit = 50 + (dexDiff * 5);
		if (chanceToHit >= Math.random() * 100) {
			console.log("y el ataque del héroe tuvo exito, ");
			addLogMessage(`${hero.name} atacó a ${monster.name} y acertó, le quedan ${monster.currentHp} puntos de vida`);
			return true;
		}
		else {
			console.log("pero fallo");
			addLogMessage(`${hero.name} atacó a ${monster.name} pero falló`)
			return false;
		}
	}

	//comprobamos si el monstruo golpea al héroe
	const calculateMonsterHp = () => {
		if (calculateIfHeroHitsMonster()) {
				const heroDamage = calculateHeroAttackDamage(); // Calculamos el daño del héroe
				setMonster((prevMonster) => {
						const updatedHp = Math.max(prevMonster.currentHp - heroDamage, 0); // Restamos el daño correctamente
						console.log(`${monster.name} recibe ${heroDamage} de daño, le quedan ${updatedHp} puntos de vida`);						
						return {
								...prevMonster,
								currentHp: updatedHp, // Actualizamos correctamente los puntos de vida
						};
				});
		}		
	};

	//comprobamos si el monstruo golpea al héroe
	const calculateIfMonsterHitsHero = () => {
		let dexDiff = monster.dexterity - hero.dexterity;
		let chanceToHit = 50 + (dexDiff * 5);
		if (chanceToHit >= Math.random() * 100) {
			addLogMessage(`${monster.name} atacó a ${hero.name} y acertó`);
			console.log("y el ataque del monstruo tuvo exito, ");			
			return true;
		}
		else {
			console.log("pero fallo");
			addLogMessage(`${monster.name} atacó a ${hero.name} pero falló`)
			return false;
		}
	}

	//comprobamos si el héroe golpea al monstruo
	const calculateHeroHp = () => {
		if (calculateIfMonsterHitsHero()) {
				const monsterDamage = calculateMonsterAttackDamage(); // Calculamos el daño del monstruo
				setHero((prevHero) => {
						const updatedHp = Math.max(prevHero.currentHp - monsterDamage, 0); // Restamos el daño correctamente
						console.log(`${hero.name} recibe ${monsterDamage} de daño, le quedan ${updatedHp} puntos de vida`);
						addLogMessage(` le quedan ${updatedHp} puntos de vida`)
						return {
								...prevHero,
								currentHp: updatedHp, // Actualizamos correctamente los puntos de vida
						};
				});
		}
	};

	//comprobamos si el monstruo ha muerto
	const calculateIfMonsterDead = () => {
		if (monster.currentHp <= 0) {			
			setMonster((prevMonster) => ({
					...prevMonster,
					currentHp: 0,
					isDead: true,
			}));
			console.log(`${monster.name} murio a manos de ${hero.name}`)				
			return true;
		}
		return false;
	};

	//comprobamos si el héroe ha muerto
	const calculateIfHeroDead = () => {
		if (hero.currentHp <= 0) {
			addLogMessage(`${hero.name} murió a manos de ${monster.name}`)
			setHero((prevHero) => ({
					...prevHero,
					currentHp: 0,
					isDead: true,
			}));
			console.log(`${hero.name} murio a manos de ${monster.name}`)				
			return true;
		}
		return false;
	};

	//comprobamos si el juego ha terminado
	const gameEnd = () => {
    if (remainingMonsters.length === 0) {
      addLogMessage(`Victoria!! Los heroes continuan su aventura`)
			console.log("los heroes han ganado")
      return true;
    } else if (remainingHeroes.length === 0) {
      addLogMessage(`Has sido derrotado!`);
			console.log("los heroes han sido derrotados")
      return true;
    }
    return false;
  };

	//cambiamos al siguiente monstruo si el actual muere
	const forceMonsterChange = () => {
		addLogMessage(`${monster.name} murió a manos de ${hero.name}`)
		setRemainingMonsters(prevMonsters => {
			const updatedMonsters = prevMonsters.filter(m => m.name !== monster.name);
			if (updatedMonsters.length > 0) {
				setMonster({
					...updatedMonsters[0],
					selectedWeapon: updatedMonsters[0].weapon1,
					selectedAbility: updatedMonsters[0].attack1,
				});
			}
			console.log (`el enemigo ${monster.name} entra en batalla`)
			return updatedMonsters;
		});
		gameEnd(); // Verifica el estado del juego después del cambio.
	};
	

	//cambiamos al siguiente héroe si el actual muere
	const forceHeroChange = () => {
		addLogMessage(`${hero.name} murió a manos de ${monster.name}`)
		setRemainingHeroes(prevHeroes => {
			const updatedHeroes = prevHeroes.filter(m => m.name !== hero.name);
			if (updatedHeroes.length > 0) {
				setHero({
					...updatedHeroes[0],
					selectedWeapon: updatedHeroes[0].weapon1,
					selectedAbility: updatedHeroes[0].attack1,
				});
        console.log(`el heroe ${hero.name} entra en batalla`)
			}			
			return updatedHeroes;
		});
		gameEnd(); // Verifica el estado del juego después del cambio.
	};

	useEffect(() => {
		if (monster.currentHp <= 0) {
			forceMonsterChange(); // Cambia al siguiente monstruo automáticamente
		}
	}, [monster.currentHp]); // Solo se ejecuta cuando `currentHp` del monstruo cambia
	
	useEffect(() => {
		if (hero.currentHp <= 0) {
			forceHeroChange(); // Cambia al siguiente héroe automáticamente
		}
	}, [hero.currentHp]); // Solo se ejecuta cuando `currentHp` del héroe cambia

	const heroAtack = () => {

		calculateHeroAttackDamage();		
		calculateMonsterHp();		
		
		return monster.currentHp;
	};

	const monsterAtack = () => {

		calculateMonsterAttackDamage();		
		calculateHeroHp();

		
		return hero.currentHp;
	};


	const handleTurn = () => {
    console.log(hero.name, hero.currentHp, monster.name, monster.currentHp);

    // Orden de ataque basado en iniciativa
    let currentPlayerFirst = hero.dexterity + hero.intelligence >= monster.dexterity + monster.intelligence ? 'hero' : 'monster';

    if (currentPlayerFirst === 'hero') {
        heroAtack();
        if (calculateIfMonsterDead()) {
          forceMonsterChange();
        }
    } else {
        monsterAtack();
        if (calculateIfHeroDead()) {
          forceHeroChange();
        }
    }

		//cambiamos orden de iniciativa
		currentPlayerFirst === 'hero' ? currentPlayerFirst='monster' : currentPlayerFirst='hero';
		if (!calculateIfHeroDead() || !calculateIfMonsterDead()) {
			if (currentPlayerFirst === 'hero') {
				heroAtack();
				if (calculateIfMonsterDead()) {
					addLogMessage(`${monster.name} murió a manos de ${hero.name}`)
					forceMonsterChange();
				}
			} else {
				monsterAtack();
				if (calculateIfHeroDead()) {
					addLogMessage(`${hero.name} murió a manos de ${monster.name}`)
					forceHeroChange();
				}
			}
		}

};

function writeLog(messages) {
  return messages.map((msg, index) => (
      <p className='Scenario-log-entry' key={index}>{msg}</p>
  ));
}

	
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
													<select className='combat-selector' onClick={handleHeroChange}>
														{arrayHeroes.map((hero) => (
															<option key={hero.name} value={hero.name}>
																{hero.name}
															</option>
														))}
													</select>

													{/* Selector de Armas */}
													<select className='combat-selector' onChange={handleWeaponChange}>
														<option value=''>Selecciona un arma</option>
														<option value={hero.weapon1.name}>{hero.weapon1.name}</option>
														<option value={hero.weapon2.name}>{hero.weapon2.name}</option>
													</select>

													{/* Selector de Habilidades */}
													<select className='combat-selector' onChange={handleAbilityChange}>
														<option value=''>Selecciona una habilidad</option>
														<option value={hero.attack1.name}>{hero.attack1.name}</option>
														<option value={hero.attack2.name}>{hero.attack2.name}</option>
													</select>
												</div>                        
                    </div>    
                </div>
                <div className='action-container'>
                    <div className='change-button' onClick={resetGame}>Reiniciar</div>
                    <Sword handleTurn={handleTurn} />
                </div>
            </div>
            <div className='Scenario-log'>
							{writeLog(log)}
						</div>
        </div>
        
    </div>
  )
}

export default ScenarioBeta