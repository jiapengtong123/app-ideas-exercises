import * as React from 'react';

type MyState = {
    json: string,
    csv: {
        title: string,
        data: string
    }
};

export default class JSON2CSV extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            json: '',
            csv: {
                title: '',
                data: ''
            }
        };

        this.jsonChangeHandler.bind(this);
        this.jsonConvertHandler.bind(this);
        this.clearHandler.bind(this);
    }

    static isJSON(str: string): boolean {
        try {
            return (JSON.parse(str) && !!str);
        } catch (e) {
            return false;
        }
    }

    jsonChangeHandler = (event: any): void => {
        this.setState({json: event.target.value});
    };

    jsonConvertHandler = (event: any): void => {
        this.JSON2CSV(this.state.json);
    };

    JSON2CSV = (value: string): void => {

        if (value === "") {
            this.setState({json: value, csv: {title: '', data: ''}});
        } else {
            if (!JSON2CSV.isJSON(value)) {
                this.setState({json: value, csv: {title: '', data: 'not valid json string'}});
            } else {
                // get json object from string
                let data = JSON.parse(value);
                // get the title of csv file
                let keys: string[] = Object.keys(data[0]);

                // set json string
                this.setState({json: value});
                // set csv title
                this.setState(prevState => ({
                    ...prevState,
                    csv: {
                        title: keys.join(',') + '\n',
                        data: ''
                    }
                }));

                // set csv data
                data.map((el: string, index: number) => {
                    this.setState(prevState => ({
                        ...prevState,
                        csv: {
                            ...prevState.csv,
                            data: prevState.csv.data + Object.values(data[index]).join(',') + '\n'
                        }
                    }));
                });
            }
        }
    };

    // clear both json input and csv output
    clearHandler = ():void => {
          this.setState({json: '', csv: {title: '', data: ''}});
    };

    render() {
        return (
            <div>
                <div>
                    <h2>JSON to CSV Converter</h2>
                    <textarea style={{width: '500px', height: '700px', resize: 'none'}} value={this.state.json}
                              onChange={this.jsonChangeHandler}>
                    </textarea>
                    <textarea style={{width: '500px', height: '700px', resize: 'none'}}
                              readOnly={true} value={this.state.csv.title + this.state.csv.data}>
                    </textarea>
                </div>
                <div>
                    <button style={{width: '100px', height: '50px', backgroundColor: 'lightgreen'}}
                            onClick={this.jsonConvertHandler}>convert
                    </button>
                    <button  style={{width: '100px', height: '50px', backgroundColor: 'lightblue'}}
                             onClick={this.clearHandler}>clear</button>
                </div>
            </div>
        )
    }
}