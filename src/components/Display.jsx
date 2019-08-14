import React from 'react';
import './Display.css'

export default props =>
    <React.Fragment>
        <div className="display">{props.value}
            <div className="op">Operação: {props.op}</div>
        </div>
    </React.Fragment>