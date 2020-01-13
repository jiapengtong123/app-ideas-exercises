import * as React from 'react';
import Button from './Button';

const buttons = [
    'AC', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '+',
    '1', '2', '3', '-',
    '0', '.', '='];

const button_colors: string[] = [
    '#777', "#777", "#777", 'orange',
    '#f1f1f1', "#f1f1f1", "#f1f1f1", 'orange',
    '#f1f1f1', "#f1f1f1", "#f1f1f1", 'orange',
    '#f1f1f1', "#f1f1f1", "#f1f1f1", 'orange',
    '#f1f1f1', "#f1f1f1", 'orange',
];

type MyState = {
    value: string
    prevValue: string,
    nextValue: string,
    operator: string
}

const button_style = (index: number) => ({
    minWidth: '100px', width: '100px', height: '100px',
    backgroundColor: button_colors[index], textAlign: 'center', lineHeight: '100px'
});

export default class Calculator extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: '0',
            prevValue: '',
            nextValue: '',
            operator: ''
        };

        this.inputDigit.bind(this);
    }

    isAC = (str: string): boolean => {
        return str === 'AC';
    };

    isDigit = (str: string): boolean => {
        return !isNaN(Number(str));
    };

    isOperator = (str: string): boolean => {
        return str === '+' || str === '-' || str === '*' || str === '/';
    };

    performOperation = () => {
        this.setState({
            value: ((): string => {
                switch (this.state.operator) {
                    case '+':
                        return (Number(this.state.prevValue) + Number(this.state.nextValue)).toString();
                    case '-':
                        return (Number(this.state.prevValue) - Number(this.state.nextValue)).toString();
                    case '*':
                        return (Number(this.state.prevValue) * Number(this.state.nextValue)).toString();
                    case '/':
                        return (Number(this.state.prevValue) / Number(this.state.nextValue)).toString();
                    default:
                        return '';
                }
            })(),
            prevValue: '',
            nextValue: '',
            operator: ''
        })
    };

    inputDigit = (e: any) => {
        const str = e.target.textContent;

        // check if press AC
        if (this.isAC(str)) {
            // clear all data
            this.setState({value: '0', prevValue: '', nextValue: '', operator: ''});
        } else if (this.isDigit(str)) {
            // if no operator, set the first value
            if (this.state.operator === '') {
                this.setState(prevState => ({
                    ...prevState,
                    value: prevState.prevValue + str,
                    prevValue: prevState.prevValue + str
                }));
            } else if (this.state.operator !== '') {
                // if has operator, set the second value
                this.setState(prevState => ({
                    ...prevState,
                    value: prevState.nextValue + str,
                    nextValue: prevState.nextValue + str
                }));
            }

        } else if (this.isOperator(str)) {
            // set the operator
            this.setState(prevState => ({
                ...prevState,
                prevValue: this.state.value,
                operator: str
            }));

        } else if (str === '=') {
            this.setState(prevState => ({
                ...prevState,
                nextValue: this.state.value
            }));
            // perform operation
            this.performOperation();
        }
    };

    render() {
        return <div>
            <h1>React Calculator</h1>
            <div className={'calculator'} style={{}}>
                {/* text area */}
                <textarea className={'input-text'} value={this.state.value}
                          readOnly={true} style={{
                    height: '50px', width: '400px', border: 'none', margin: '0px', padding: '0px',
                    backgroundColor: 'black',
                    resize: 'none', fontSize: '40px', color: 'white', textAlign: 'right',
                }}/>
                {/* buttons */}
                <div
                    style={{
                        display: 'flex', flexWrap: 'wrap',
                        margin: '0px auto', width: '400px', height: '500px', maxWidth: '410px',
                    }}>
                    {buttons.map((el: string, index: number): any => {
                        return <Button content={el} style={button_style(index)} fn={this.inputDigit}/>
                    })}
                </div>
            </div>
        </div>
    }
}