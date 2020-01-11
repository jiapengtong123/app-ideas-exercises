import * as React from 'react';

type MyState = {
    result: string
}

export default class Bin2Dec extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            result: ''
        };

        this.inputChangeHandler.bind(this);
    }

    Bin2DecHelper(input: string) {
        let result: number = 0;
        let ERROR: number = 0;

        // check if the input is empty
        if (input === '' || input === undefined
            || input === null) {
            return '';
        }

        // check if only contains 0 or 1
        input.split('').map((el: string) => {
            if (Number(el) !== 1 && Number(el) !== 0) {
                ERROR = 1;
            }
        });

        if (ERROR === 1) {
            return 'error';
        }

        // convert to dec
        input.split('').reverse().map((el: string, index: number) => {
            result += Number(el) * Math.pow(2, index);
        });

        return result;
    }

    inputChangeHandler = (event: any) => {
        this.setState({result: this.Bin2DecHelper(event.target.value).toString()});
    };

    render() {
        return (
            <div style={{display: 'flex', height:'100%', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
                <h1>Binary to Decimal Converter</h1>
                <p>Enter the binary number:</p>
                <input
                    type='text'
                    onChange={this.inputChangeHandler}
                />
                <p>the decimal number is <span style={{color:'red'}}>{this.state.result}</span></p>
            </div>
        );
    }
};



