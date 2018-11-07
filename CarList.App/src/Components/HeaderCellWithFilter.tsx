import { filter } from 'src/Types';
import * as React from 'react';
import styled from 'styled-components';

interface IHeaderWithFilterProps {
    upFilter:filter;
    downFilter:filter;
    currentFilter:filter;
    filterAction:(_:filter)=>void;
}


export default class HeaderCellWithFilter extends React.Component<IHeaderWithFilterProps,{}>
{
constructor(props:any){
    super(props);
    this.upClick = this.upClick.bind(this);
    this.downClick = this.downClick.bind(this);
}

public upClick(){
    this.props.filterAction(this.props.upFilter)
}

public downClick(){
   this.props.filterAction(this.props.downFilter)
}

public render(){
const {upFilter, downFilter, currentFilter} = this.props;
return (
<ArrowContainer>
<Arrow>{upFilter!== currentFilter?<ArrowUp onClick={this.upClick}/>:null}</Arrow>
<Arrow>{downFilter!== currentFilter?<ArrowDown onClick={this.downClick}/>:null}</Arrow>
</ArrowContainer>);
}
}

const ArrowContainer = styled.div`
display:inline-block;
height:22px;
float:right;
`;
const Arrow = styled.div`
height:50%;
`;
const ArrowUp = styled.div`
width: 0; 
height: 0; 
border-left: 8px solid transparent;
border-right: 8px solid transparent; 
border-bottom:7px solid black; 
cursor:pointer;
`;
const ArrowDown = styled.div`
width: 0; 
height: 0; 
border-left: 8px solid transparent;
border-right: 8px solid transparent; 
border-top:7px solid black; 
cursor:pointer;
`;
