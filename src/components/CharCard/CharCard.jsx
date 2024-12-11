import React from 'react'
import './CharCard.css'
import Scenario from '../Scenario/Scenario.jsx'

function CharCard({ character }) {
  return (
    <div>
        <div className='Card-father'>
        <div className='name-container'>{character.name}</div>
        <div className='hp-container'>{character.currentHp} / {character.maxHp}</div>
        <div className='portrait-container'>
            <img src={character.portrait} alt={character.name} className='character-portrait' />
        </div>
        </div>
    </div>
  )
}

export default CharCard