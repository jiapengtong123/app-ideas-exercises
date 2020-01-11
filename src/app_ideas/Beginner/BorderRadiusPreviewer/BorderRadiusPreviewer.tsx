import * as React from 'react';

type MyState = {
    topLeft: string,
    topRight: string,
    bottomLeft: string,
    bottomRight: string
    css: {
        [key: string]: string,
    }
    result: string
};

export default class BorderRadiusPreviewer extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            topLeft: '0',
            topRight: '0',
            bottomLeft: '0',
            bottomRight: '0',
            css: {
                'border-top-left-radius': '0px',
                'border-top-right-radius': '0px',
                'border-bottom-left-radius': '0px',
                'border-bottom-right-radius': '0px',
            },
            result: ''
        };

        this.topLeftRadiusChangeHandler.bind(this);
        this.topRightRadiusChangeHandler.bind(this);
        this.bottomLeftRadiusChangeHandler.bind(this);
        this.bottomRightRadiusChangeHandler.bind(this);
    }

    checkMaxRadius = (radius: string): string => {
        if (Number(radius) >= 150) {
            return '150';
        } else {
            return radius;
        }
    };

    topLeftRadiusChangeHandler = (event: any) => {
        let value = this.checkMaxRadius(event.target.value);
        this.setState(prevState => ({
            topLeft: value,
            css: {
                ...prevState.css,
                'border-top-left-radius': value + 'px'
            }
        }));
    };

    topRightRadiusChangeHandler = (event: any) => {
        let value = this.checkMaxRadius(event.target.value);
        this.setState(prevState => ({
            topRight: value,
            css: {
                ...prevState.css,
                'border-top-right-radius': value + 'px'
            },
        }));
    };

    bottomLeftRadiusChangeHandler = (event: any) => {
        let value = this.checkMaxRadius(event.target.value);
        this.setState(prevState => ({
            bottomLeft: value,
            css: {
                ...prevState.css,
                'border-bottom-left-radius': value + 'px'
            },
        }));
    };

    bottomRightRadiusChangeHandler = (event: any) => {
        let value = this.checkMaxRadius(event.target.value);
        this.setState(prevState => ({
            bottomRight: value,
            css: {
                ...prevState.css,
                'border-bottom-right-radius': value + 'px'
            },
        }));
    };

    integrate = (): string => {
        let css_text: string = '';
        Object.keys(this.state.css).map((el: string): void => {
            css_text += `${el}: ${this.state.css[el]}\n`;
        });
        return css_text;
    };

    render() {
        return (
            <>
                <h1>Border Radius Previewer</h1>
                <div style={{
                    width: '600px',
                    margin: '100px auto',
                    position: 'relative'
                }}>
                    <div style={{width: '100px', height: '50px', position: 'absolute', left: '', textAlign: 'left'}}>
                        <input size={Math.max(1, this.state.topLeft.length)} maxLength={6}
                               value={this.state.topLeft} onChange={this.topLeftRadiusChangeHandler}/>
                    </div>
                    <div style={{
                        width: '100px',
                        height: '50px',
                        position: 'absolute',
                        right: '-0px',
                        textAlign: 'right'
                    }}>
                        <input size={Math.max(1, this.state.topRight.length)} maxLength={6}
                               value={this.state.topRight} onChange={this.topRightRadiusChangeHandler}/>
                    </div>
                    <div style={{
                        width: '100px',
                        height: '50px',
                        position: 'absolute',
                        top: '375px',
                        left: '',
                        textAlign: 'left'
                    }}>
                        <input size={Math.max(1, this.state.bottomLeft.length)} maxLength={6}
                               value={this.state.bottomLeft} onChange={this.bottomLeftRadiusChangeHandler}/>
                    </div>
                    <div style={{
                        width: '100px',
                        height: '50px',
                        position: 'absolute',
                        top: '375px',
                        right: '-0px',
                        textAlign: 'right'
                    }}>
                        <input size={Math.max(1, this.state.bottomRight.length)} maxLength={6}
                               value={this.state.bottomRight} onChange={this.bottomRightRadiusChangeHandler}/>
                    </div>

                    <div style={{
                        margin: '0 auto', width: '400px', height: '300px',
                        padding: '50px', backgroundColor: '#e9eaee', textAlign: 'center',
                        borderTopLeftRadius: this.state.topLeft + 'px',
                        borderTopRightRadius: this.state.topRight + 'px',
                        borderBottomLeftRadius: this.state.bottomLeft + 'px',
                        borderBottomRightRadius: this.state.bottomRight + 'px'
                    }}>
                    <textarea readOnly={true}
                              style={{
                                  width: '400px', height: '300px', resize: 'none', backgroundColor: '#fafafc',
                                  boxShadow: '2px 4px #888888'
                              }}
                              value={this.integrate()}>
                    </textarea>
                    </div>
                </div>
            </>
        );
    }
}