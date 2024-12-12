import React, { useState } from 'react';
import sword from '../../images/swordIcon.png';
import './Sword.css'; // Importa los estilos CSS

//cambiar handleTurn por combatTurn o viceversa
function Sword({ handleTurn }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const animateSword = () => {
        setIsAnimating(true);
        // Detener la animación después de un tiempo (por ejemplo, 1 segundo)
        setTimeout(() => setIsAnimating(false), 400);
    };

    const handleClick = () => {
        animateSword(); // Ejecuta la animación
        handleTurn(); // Ejecuta la función combatTurn pasada como prop
    };

    return (
        <div className='sword-icon-container' onClick={handleClick}>
            <img 
                className={`sword-icon ${isAnimating ? 'swing' : ''}`} 
                src={sword} 
                alt="sword-icon" 
            />            
        </div>
    );
}

export default Sword;
