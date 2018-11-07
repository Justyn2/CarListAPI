import * as React from 'react';
import styled from 'styled-components';
import InfoCell from 'src/Components/InfoCell/InfoCell';
import { connect } from 'react-redux';
import { IAppState, filter } from 'src/Types';
import { Dispatch } from 'redux';
import { updateFilter } from 'src/Redux/Actions/App';
import HeaderCellWithFilter from 'src/Components/HeaderCellWithFilter';

const MapStateToProps = (state:{app:IAppState}) => {
 return{currentFilter:state.app.currentFilter}; 
}

interface ICarHeader{
    currentFilter:filter;
    dispatch:Dispatch;
}

export class CarHeader extends
React.Component<ICarHeader,{}>{
    constructor(props:ICarHeader){
        super(props);
        this.filter= this.filter.bind(this);
    }

    public filter (key:filter){
           this.props.dispatch(updateFilter(key));
    }

    public render(){
        const bgColor='Gainsboro';
        const {currentFilter} = this.props;
        return(
            <Row>
                <InfoCell data={"Make"}style={{paddingLeft:'.5em', paddingRight:'.5em'}} backgroundColor={bgColor}>
                    <HeaderCellWithFilter upFilter={filter.makeasc} downFilter={filter.makedesc} currentFilter={currentFilter} filterAction={this.filter}/>
                </InfoCell>
                <InfoCell data={"Model"} style ={{paddingRight:'.5em'}} backgroundColor={bgColor}>
                    <HeaderCellWithFilter upFilter={filter.modelasc} downFilter={filter.modeldesc} currentFilter={currentFilter} filterAction={this.filter}/>
                </InfoCell>
                <InfoCell data={"Trim"} style ={{paddingRight:'.5em'}} backgroundColor={bgColor} >
                    <HeaderCellWithFilter upFilter={filter.trimasc} downFilter={filter.trimdesc} currentFilter={currentFilter} filterAction={this.filter}/>
                </InfoCell>
                <InfoCell data={"Year"} style ={{paddingRight:'.5em'}} backgroundColor={bgColor} width={'10%'}> 
                    <HeaderCellWithFilter upFilter={filter.yearasc} downFilter={filter.yeardesc} currentFilter={currentFilter} filterAction={this.filter}/>
                </InfoCell>
                <InfoCell backgroundColor={bgColor} align={'center'} width={'15%'}/>
            </Row>
        );
    }
}

const Row = styled.div`
width:100%;
`;

export default connect(MapStateToProps)(CarHeader)
