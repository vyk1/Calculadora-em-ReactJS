import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';
import Historico from '../components/Historico';


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
    history: ''
}

// class é uma palavra reservada para java
// portanto, é melhor utilizar classname
export default class Calculator extends Component {

    state = { ...initialState }
    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory() {
        this.setState({ ...initialState })
    }
    setOperation(operation) {

        // primeira operação
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            // pegar operação anteror
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            // faz a op e é armazenado no índice zero!

            const now = `${values[0]}${currentOperation}${values[1]} \n`;
            try {
                // switch!
                switch (currentOperation) {
                    case '+':
                        values[0] = values[0] + values[1];
                        break;

                    case '-':
                        values[0] = values[0] - values[1]
                        break;

                    case '*':
                        values[0] = values[0] * values[1]
                        break;

                    case '/':
                        values[0] = values[0] / values[1]
                        break;

                    default:
                        break;
                }

            } catch (error) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                history: now,
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }

    }
    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        //s já houver um zero no display ou se clear estiver true 
        const clearDisplay = this.state.displayValue === '0' ||
            this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })


        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            // histórico?
            this.setState({ values })

        }
    }

    render() {

        return (
            <React.Fragment>
                <Historico value={this.state.history} />
                <div className="calculator">
                    <Display value={this.state.displayValue} op={this.state.operation === '=' ? '' : this.state.operation} />
                    <Button label="AC" click={this.clearMemory} triple />
                    <Button label="/" operation click={this.setOperation} />
                    <Button label="7" click={this.addDigit} />
                    <Button label="8" click={this.addDigit} />
                    <Button label="9" click={this.addDigit} />
                    <Button label="*" operation click={this.setOperation} />
                    <Button label="4" click={this.addDigit} />
                    <Button label="5" click={this.addDigit} />
                    <Button label="6" click={this.addDigit} />
                    <Button label="-" operation click={this.setOperation} />
                    <Button label="1" click={this.addDigit} />
                    <Button label="2" click={this.addDigit} />
                    <Button label="3" click={this.addDigit} />
                    <Button label="+" operation click={this.setOperation} />
                    <Button label="0" click={this.addDigit} double />
                    <Button label="." click={this.addDigit} />
                    <Button label="=" operation click={this.setOperation} />
                </div>
            </React.Fragment>

        )
    }
}