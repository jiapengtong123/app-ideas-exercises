import * as React from 'react';

type MyState = {
    topLeft: string,
    topRight: string,
    bottomLeft: string,
    bottomRight: string
};

export default class BorderRadiusPreviewer extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            topLeft: '0',
            topRight: '0',
            bottomLeft: '0',
            bottomRight: '0'
        };

        this.topLeftRadiusChangeHandler.bind(this);
        this.topRightRadiusChangeHandler.bind(this);
        this.bottomLeftRadiusChangeHandler.bind(this);
        this.bottomRightRadiusChangeHandler.bind(this);
    }
    checkMaxRadius = (radius: string) => {
        if (Number(radius) >= 150) {
            return '150';
        } else {
            return radius;
        }
    };

    topLeftRadiusChangeHandler = (event: any) => {
        this.setState({topLeft: this.checkMaxRadius(event.target.value)});
    };

    topRightRadiusChangeHandler = (event: any) => {
        this.setState({topRight: this.checkMaxRadius(event.target.value)});
    };

    bottomLeftRadiusChangeHandler = (event: any) => {
        this.setState({bottomLeft: this.checkMaxRadius(event.target.value)});
    };

    bottomRightRadiusChangeHandler = (event: any) => {
        this.setState({bottomRight: this.checkMaxRadius(event.target.value)});
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
                    <div style={{ width: '100px',
                        height: '50px',
                        position: 'absolute',
                        top: '375px',
                        right: '-0px',
                        textAlign: 'right'}}>
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
                              style={{width: '400px', height: '300px', resize: 'none', backgroundColor: '#fafafc',
                              boxShadow: '2px 4px #888888'}}>
                    </textarea>
                    </div>

                    {/*<button style={{width: '400px', backgroundColor:'lightblue', height: '50px'}}>copy</button>*/}
                </div>
            </>
        );
    }
}