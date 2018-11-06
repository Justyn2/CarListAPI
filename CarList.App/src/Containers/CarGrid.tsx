import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CarRow, { ICarRowProps } from './CarRow';
import { openDialogue } from 'src/Redux/Actions/App';
import { IAppState } from 'src/Types';
import * as Dialogues from 'src/Redux/Constants/Dialogues';
import styled from 'styled-components';
import { tableLength } from 'src/constants';

interface ICarGridProps
{
    dispatch:Dispatch;
    cars:any[];
}

function mapStateToProps(state:{app:IAppState}) {
    const {cars} = state.app;
    return {cars};
}

class CarGrid 
extends React.Component<ICarGridProps,{}>{

    constructor(props:ICarGridProps){
        super(props);
        this.openDialogueAction = this.openDialogueAction.bind(this);
    }

    public openDialogueAction( id:string, dialogue:Dialogues.Dialogue,){
        return () => {
         return () => this.props.dispatch(openDialogue(id, dialogue));
        };
    }

    
    public render(){ 
        const {cars} = this.props;
        const filler:ICarRowProps[]=[];
         if(cars.length < tableLength){
         for(let i=cars.length; i<tableLength; i++){
                filler.push({
                    id:`${i}`,
                    make:'',
                    model:'',
                    trim:'',
                    year:'',
                    bgColor:(i%2===1)?'WhiteSmoke':'White'                             
                });
              }
        }
        return(
        <GridContainer>
            {cars.map((car:ICarRowProps,i)=>(
            <CarRow 
                {...car}
                key={car.id}
                bgColor={i%2===1?'WhiteSmoke':'White'}
                editAction={this.openDialogueAction(car.id, Dialogues.EDIT_CAR_DIALOGUE)} 
                deleteAction = {this.openDialogueAction(car.id, Dialogues.DELETE_CAR_DIALOGUE)}
                detailAction = {this.openDialogueAction(car.id, Dialogues.CAR_DETAILS_DIALOGUE)}
            />))}
            {
                filler.map((car:ICarRowProps)=>(<CarRow key={car.id} {...car}/>))
            }
        </GridContainer>
        );
    }
}

const GridContainer = styled.div`
border-top:2px solid black;
border-left: 2px solid black;
border-right: 2px solid black;
border-bottom: 3px solid black;
box-sizing:border-box;
margin-top:8px;
`;

export default connect(mapStateToProps)(CarGrid);