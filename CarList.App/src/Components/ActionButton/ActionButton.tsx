import * as React from 'react';
import {StyledButton} from './ActionButton.styles'

export interface IActionButtonProps
{
    action?:(_:any)=>any;
    enabled:boolean;
    style?:React.CSSProperties;
    text:string;
    type?:string;
}

export default class ActionButton extends React.Component<IActionButtonProps,{}>
{
   constructor(props:IActionButtonProps){
       super(props);
       this.OnClick = this.OnClick.bind(this);
   } 
   public OnClick(e:React.MouseEvent){
       e.preventDefault();
       if(this.props.enabled&&this.props.action){
       this.props.action(e);
       }
   }    
   public render(){
       const {text,type, style} = this.props;
       return(
        <StyledButton type={type} style={style} title={text} onClick={this.OnClick}>{text}</StyledButton>
       )
   }
}

