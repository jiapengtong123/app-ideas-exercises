import * as React from 'react';
import {useState} from "react";

export default function Button(props) {
    const [style, setStyle] = useState(props.style);

    const mouseDownHandler = () => {
        setStyle({
            ...props.style,
            filter: 'brightness(75%)'
        });
    };

    const mouseUpHandler = () => {
        setStyle({
            ...props.style,
            filter: 'brightness(100%)'
        })
    };

    switch (props.content) {
        case '0':
            props.style.width = '200px';
        default:
            return (<div style={style} onClick={props.fn}
                         onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}>
                {props.content}
            </div>);
    }
}