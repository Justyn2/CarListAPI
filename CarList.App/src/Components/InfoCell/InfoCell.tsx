import * as React from 'react';
import styled from 'styled-components';

interface IInfoCellProps{
    data?:string;
    width?:string;
    backgroundColor?:string;
    align?:'center'|'right';
    style?:React.CSSProperties;
}
export default class InfoCell
extends React.Component<IInfoCellProps,{}>{
    constructor(props:IInfoCellProps){
        super(props);
    }
    public render(){
        const {children,data,style,width, backgroundColor, align} = this.props;
        return(
            <Cell width={width} style={style} backgroundColor={backgroundColor} align={align}>
                {data}&#8203;{children}
            </Cell>
        );
    }

}

interface IStyledCellProps {
    width?:string;
    backgroundColor?:string;
    align?:'center'|'right';
}

const Cell= styled.div`
text-align:${(props:IStyledCellProps) => props.align||'left'}};
display:inline-block;
padding-top:2px;
padding-bottom:2px;
box-sizing:border-box;
border-right: 1px solid black;
border-left: 1px solid black;
width:${(props:IStyledCellProps) => props.width || '25%'};
background-color:${(props:IStyledCellProps) => props.backgroundColor || 'white'};
`;