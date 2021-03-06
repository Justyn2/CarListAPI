import * as React from 'react';
import styled from 'styled-components';

interface IFormInputProps{
    name:string;
    value:string;
    label:string;
    noEdit?:boolean;
    onChange?:(event:React.ChangeEvent)=>void;
}
export default class FormInput extends 
React.Component<IFormInputProps,{}>{
    constructor(props : IFormInputProps){
        super(props);
    }
    public render(){
        const {name, value, noEdit, label, onChange} = this.props
        return(
        <span>
        <label htmlFor={name}>{label}</label>
        <StyledInput disabled={noEdit}  id={name} defaultValue={value} onChange={onChange} />
        </span>
        )
    }
}

const StyledInput = styled.input`
background:transparent;
border:
${props => props.disabled ? 
`2px solid transparent;`
     : `2px solid black;`}
`;