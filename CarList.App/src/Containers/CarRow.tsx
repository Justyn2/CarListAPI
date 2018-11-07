import * as React from 'react';
import styled from 'styled-components';
import InfoCell from 'src/Components/InfoCell/InfoCell';
import RowButton from 'src/Components/ActionButton/RowButton';

export interface ICarRowProps{
    id:string;
    make:string;
    model:string;
    trim:string;
    year:string;
    bgColor:string;
    deleteAction?:(id:string)=>any;
    editAction?:(id:string)=>any;
    detailAction?:(id:string)=>any;
}
export default class CarRow extends
React.Component<ICarRowProps,{}>{
    constructor(props:ICarRowProps){
        super(props);
    }

    public render(){
        const {id, make, model, trim, year, bgColor, editAction, deleteAction, detailAction} = this.props;
        return(
            <Row>
                <InfoCell backgroundColor={bgColor}>
        {detailAction ? <RowButton enabled={true} style={{textDecoration:'underline'}} symbol={make} text={'Car Details'} action={detailAction(id)} />:null}
                </InfoCell>
                <InfoCell data={model} backgroundColor={bgColor} />
                <InfoCell data={trim} backgroundColor={bgColor} />
                <InfoCell data={year} backgroundColor={bgColor} align={'right'} width={'10%'}/>
                <InfoCell backgroundColor={bgColor} align={'center'} width={'15%'}>
        {editAction ? <RowButton enabled={true} style={{fontWeight:900}} symbol={'🖉'} text={'Edit Car'} action={editAction(id)} /> : null }
        {deleteAction ? <RowButton enabled={true} style={{fontWeight:900}} symbol={'🗑'} text={'Delete Car'} action={deleteAction(id)} /> : null}
                </InfoCell>
            </Row>
        );
    }

}

const Row = styled.div`
width:100%;
`;