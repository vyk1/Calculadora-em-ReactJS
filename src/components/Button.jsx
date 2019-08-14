import React from 'react';
import './Button.css'

// priorize componentes funcionais
export default props =>
    // propriedades condicionais
    <button
        onClick={e => props.click && props.click(props.label)}
        className={`
    button 
    ${props.operation ? 'operation' : ''}
    ${props.double ? 'double' : ''}
    ${props.double ? 'double' : ''}
    ${props.triple ? 'triple' : ''}
    `}>
        {props.label}
    </button>