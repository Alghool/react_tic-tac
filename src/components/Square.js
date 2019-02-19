import React from 'react';
import ReactDOM from 'react-dom';

export default function Square(props){
    const myClassName = 'square ' + (props.winningClass);

    return (    
      <button className={myClassName} 
        onClick={props.onClick}>
        {props.value}
      </button>
    );
}