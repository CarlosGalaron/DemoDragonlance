import React, { useState, useEffect } from "react";
import { calculateDamage, checkOrder } from "../combatFunctions";
import Sword from "../components/Sword";

const Scenario = ({ heroes, monsters }) => {
  const [hero, setHero] = useState(null);
  const [monster, setMonster] = useState(null);
  const [turn, setTurn] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (heroes.length > 0 && monsters.length > 0) {
      const initialHero = heroes[0];
      const initialMonster = monsters[0];
      setHero(initialHero);
      setMonster(initialMonster);
      setTurn(checkOrder(initialHero, initialMonster));
      setLog(["El combate ha comenzado!"]);
    }
  }, [heroes, monsters]);

  const handleLog = (message) => {
    setLog((prev) => [...prev, message]);
  };

  const handleAttack = () => {
    if (turn === "hero" && hero && monster) {
      const damage = calculateDamage(hero.weapon, hero.ability, monster.armour);
      const updatedMonster = { ...monster, currentHp: Math.max(monster.currentHp - damage, 0) };
      setMonster(updatedMonster);
      handleLog(`${hero.name} ataca con ${hero.weapon.name}, causando ${damage} de daño.`);

      if (updatedMonster.currentHp === 0) {
        handleLog(`${monster.name} ha sido derrotado.`);
        if (monsters.length === 1) {
          handleLog("¡Todos los monstruos han sido derrotados!");
          endGame("hero");
          return;
        }
      }

      setTurn("monster");
    } else if (turn === "monster" && hero && monster) {
      const damage = calculateDamage(monster.weapon, monster.ability, hero.armour);
      const updatedHero = { ...hero, currentHp: Math.max(hero.currentHp - damage, 0) };
      setHero(updatedHero);
      handleLog(`${monster.name} ataca con ${monster.weapon.name}, causando ${damage} de daño.`);

      if (updatedHero.currentHp === 0) {
        handleLog(`${hero.name} ha sido derrotado.`);
        if (heroes.length === 1) {
          handleLog("¡Todos los héroes han sido derrotados!");
          endGame("monster");
          return;
        }
      }

      setTurn("hero");
    }
  };

  const endGame = (winner) => {
    handleLog(winner === "hero" ? "¡Los héroes han ganado!" : "¡Los monstruos han ganado!");
    alert(winner === "hero" ? "¡Victoria!" : "Derrota...");
  };

  return (
    <div>
      <div className="log">
        {log.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
      <Sword onClick={handleAttack} />
    </div>
  );
};

export default Scenario;
