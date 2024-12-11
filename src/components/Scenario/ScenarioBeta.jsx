import React from 'react'
import { useState, useEffect } from 'react'
import './Scenario.css'
import Sword from '../Sword/Sword.jsx'
import CharCard from '../CharCard/CharCard.jsx'
import { arrayHeroes, arrayMonsters } from '../../modelo/charFunctions'

function ScenarioBeta() {
	//declaramos variables globales
	const [turn, setTurn] = useState('');
	// const [playerIsFirst, setPlayerIsFirst] = useState(false);
	
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
			selectedWeapon: arrayMonsters[0].weapon1,
			selectedAbility: arrayMonsters[0].attack1,
		});
		setRemainingHeroes([...arrayHeroes]);
		setRemainingMonsters([...arrayMonsters]);
		setTurn('');
	};

	//comprobamos el orden de los combatientes
	const checkCombatOrder = () => {
    hero.initiative = hero.dexterity + hero.intelligence;
    monster.initiative = monster.dexterity + monster.intelligence;
    if (hero.initiative >= monster.initiative) {
        setTurn('player');
				console.log("El héroe va primero");
    }
		else {
        setTurn('npc');
				console.log("El monstruo va primero");
    }
	};

	//cambiamos el turno de player a monster o viceversa
	const changeTurn = () => {
		if (turn === 'player') {
			setTurn('npc');
			console.log("player realizo su accion");
		} 
		else {
			setTurn('player');
			console.log("npm realizo su accion");
		};

	};

	//calculamos el daño del héroe
	const calculateHeroAttackDamage = () => {  
		const heroDamage = hero.selectedWeapon.damage + hero.selectedAbility.damage;
		console.log(`${hero.name} hara ${heroDamage} de daño si acierta`);
		return heroDamage;
	};

	// Calculamos si el héroe golpea al monstruo
	const calculateIfHeroHitsMonster = () => {
		let heroDexDiff = hero.dexterity - monster.dexterity;
		let chanceToHit = 50 + (heroDexDiff * 5);
		if (chanceToHit >= Math.random() * 100) {
			console.log("y el ataque del héroe tuvo éxito.");
			return true;
		} else {
			console.log("pero falló.");
			return false;
		}
	};

	// Restamos vida al monstruo
	const calculateMonsterHp = () => {
		const heroDamage = calculateHeroAttackDamage(); // Declaramos la variable
		if (calculateIfHeroHitsMonster()) {
		  const updatedHp = Math.max(monster.currentHp - heroDamage, 0); // Declaramos la variable
		  setMonster((prevMonster) => ({
			...prevMonster,
			currentHp: updatedHp,
		  }));
		  console.log(`${monster.name} recibe ${heroDamage} de daño, le quedan ${updatedHp} puntos de vida.`);
		}
	  };

	//calculamos el daño del monstruo
	const calculateMonsterAttackDamage = () => {
		const monsterDamage = monster.selectedWeapon.damage + monster.selectedAbility.damage;
		console.log(`${monster.name} hara ${monsterDamage} de daño si acierta`);
		return monsterDamage;
	};

	//comprobamos si el monstruo golpea al héroe
	const calculateIfMonsterHitsHero = () => {
		let monsterDexDiff = monster.dexterity - hero.dexterity;
		let chanceToHit = 50 + (monsterDexDiff * 5);
		if (chanceToHit >= Math.random() * 100) {
			console.log("y el ataque del monstruo tuvo exito, ");
			return true;
		}
		else {
			console.log("pero fallo");
			return false;
		}
	};

	//restamos vida al héroe
	const calculateHeroHp = () => {
		const monsterDamage = calculateMonsterAttackDamage(); // Declaramos la variable
		if (calculateIfMonsterHitsHero()) {
			setHero((prevHero) => {
				const updatedHp = Math.max(prevHero.currentHp - monsterDamage, 0); // Declaramos la variable
				console.log(`${hero.name} recibe ${monsterDamage} de daño, le quedan ${updatedHp} puntos de vida`);
				return {
					...prevHero,
					currentHp: updatedHp,
				};
			});
		}
	};

	// Comprobamos si el héroe ha muerto
	const checkIfHeroDead = () => {	
		if (hero.currentHp <= 0) {			
			console.log(`${hero.name} murio a manos de ${monster.name}`);
			return true;
		}
	};

	// Comprobamos si el monstruo ha muerto
	const checkIfMonsterDead = () => {
		if (monster.currentHp <= 0) {
			console.log(`${monster.name} murio a manos de ${hero.name}`);
			return true;
		}
	};

	const heroVictory = () => {
		resetGame();
		console.log("¡Felicidades, has ganado!");
	};
	const monsterVictory = () => {
		resetGame();
		console.log("¡Game Over! Los monstruos han ganado.");
	};

	// Cambia al siguiente héroe si el actual muere
	const forceHeroChange = () => {
		if (checkIfHeroDead()) {
			setRemainingHeroes((prevHeroes) => {
				const updatedHeroes = prevHeroes.filter(m => m.name !== hero.name);
						
					if (updatedHeroes.length > 0) {
						const nextHero = updatedHeroes[0]; // Seleccionamos el siguiente héroe
						setHero({
							...nextHero,
							selectedWeapon: nextHero.weapon1,
							selectedAbility: nextHero.attack1,
						});
						console.log(`El heroe ${nextHero.name} entra en batalla.`);
					} else {
						monsterVictory(); // Fin del combate
						console.log("¡Todos los héroes han sido derrotados!");
					}
						
					return updatedHeroes;
				});
		}
	};

	// Cambia al siguiente monstruo si el actual muere
	const forceMonsterChange = () => {
		if (checkIfMonsterDead()) {
			setRemainingMonsters((prevMonsters) => {
				const updatedMonsters = prevMonsters.filter(m => m.name !== monster.name);
						
				if (updatedMonsters.length > 0) {
					const nextMonster = updatedMonsters[0]; // Seleccionamos el siguiente monstruo
					setMonster({
						...nextMonster,
						selectedWeapon: nextMonster.weapon1,
						selectedAbility: nextMonster.attack1,
					});
					console.log(`El enemigo ${nextMonster.name} entra en batalla.`);
					setTurn('');
				} else {
					heroVictory(); // Fin del combate
					console.log("¡Todos los enemigos han sido derrotados!"); // Fin del combate
				}
						
				return updatedMonsters;
			});
		}
	};
	

	//esta funcion gestiona el combate
	const handleTurn = () => {
    console.log("Comienza el turno:");
    console.log(`${hero.name}: ${hero.currentHp} HP | ${monster.name}: ${monster.currentHp} HP`);

	checkCombatOrder();
	if (turn === 'player') {
		// Ataque del héroe
		changeTurn();
		const heroDamage = calculateHeroAttackDamage();
		if (calculateIfHeroHitsMonster()) {
			const updatedHp = Math.max(monster.currentHp - heroDamage, 0);
			setMonster(prevMonster => ({
				...prevMonster,
				currentHp: updatedHp,
			}));
			console.log(`¡Éxito! ${hero.name} infligió ${heroDamage} a ${monster.name}.`);
			calculateMonsterHp();
			forceMonsterChange();
		} else {
			console.log(`${hero.name} falló el ataque.`);
		}
		
		
		// Pasar el turno al NPC si no ha muerto
		if (turn === 'npc') {
			changeTurn();

			const monsterDamage = calculateMonsterAttackDamage();
			if (calculateIfMonsterHitsHero()) {
				const updatedHp = Math.max(hero.currentHp - monsterDamage, 0);
				setHero(prevHero => ({
					...prevHero,
					currentHp: updatedHp,
				}));
				console.log(`¡Cuidado! ${monster.name} infligió ${monsterDamage} a ${hero.name}.`);
				calculateHeroHp();
				forceHeroChange();
			} else {
				console.log(`${monster.name} falló el ataque.`);
			}			
			setTurn('');
		}		
	}

	else if (turn === 'npc') {
		// Ataque del monstruo
		const monsterDamage = calculateMonsterAttackDamage();
		if (calculateIfMonsterHitsHero()) {
			const updatedHp = Math.max(hero.currentHp - monsterDamage, 0);
			setHero(prevHero => ({
				...prevHero,
				currentHp: updatedHp,
			}));
			console.log(`¡Cuidado! ${monster.name} infligió ${monsterDamage} a ${hero.name}.`);
			
			if (checkIfHeroDead()) {
				forceHeroChange();
				setTurn('');
			}
			
		} else {
			console.log(`${monster.name} falló el ataque.`);			
		}

		// Pasar el turno al jugador si no ha muerto
		if (hero.currentHp > 0) {
			changeTurn();
			const heroDamage = calculateHeroAttackDamage();
			if (calculateIfHeroHitsMonster()) {
				const updatedHp = Math.max(monster.currentHp - heroDamage, 0);
				setMonster(prevMonster => ({
					...prevMonster,
					currentHp: updatedHp,
				}));
				console.log(`¡Éxito! ${hero.name} infligió ${heroDamage} a ${monster.name}.`);
				
				if (checkIfMonsterDead()) {
					forceMonsterChange();
					setTurn('');
				}
				
			} else {
				console.log(`${hero.name} falló el ataque.`);
			}
		}
	}

	setTurn('');


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
													<select className='combat-selector' onChange={handleHeroChange}>
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
                    <div className='change-button'>Cambiar</div>
                    <Sword handleTurn={handleTurn} />
                </div>
            </div>
            <div className='Scenario-log'>
							Aqui ira el log
						</div>
        </div>
        
    </div>
  )
}

export default ScenarioBeta