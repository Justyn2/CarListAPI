import * as React from 'react';
import styled from 'styled-components';

export interface IRowButtonProps
{
    action:()=>any;
    enabled:boolean;
    symbol:string;
    style?:React.CSSProperties;
    text:string;
}
export default class RowButton extends React.Component<IRowButtonProps,{}>
{
   constructor(props:IRowButtonProps){
       super(props);
       this.OnClick = this.OnClick.bind(this);
   } 
   public OnClick(e:React.MouseEvent<HTMLDivElement>){
       e.preventDefault();
       if(this.props.enabled){
       this.props.action();
       }
   }
   public render(){
       const {text,symbol, style} = this.props;
       return(
        <StyledIconButton style={style} title={text} onClick={this.OnClick}>
        {symbol}
        </StyledIconButton>
       )
   }
}

const StyledIconButton = styled.div`
    cursor: pointer;
    display: inline-block;
    padding-left: .25em;
    padding-right: .25em;
    margin-left:.25em;
    margin-right:.25em;
    font-weight: 900;
`;
