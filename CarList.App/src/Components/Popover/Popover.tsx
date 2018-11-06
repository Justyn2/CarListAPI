import * as React from 'react';
import styled from 'styled-components';
interface IPopoverProps{
    title:string;
}
export default class Popover extends React.Component<IPopoverProps,{}> {
    constructor(props:IPopoverProps){
        super(props);
    }
    public render(){
        const {children,title} = this.props;
        return (
            <Overlay>
                <PopOverBody>
                   <PopOverTitle>{title}</PopOverTitle>
                   <Clear/>
                    {children}
                </PopOverBody>
            </Overlay>
        );
    }

} 

const Overlay = styled.div`
margin:0;
height:100%;
width:100%
position:absolute;
vertical-align:middle;
z-index:1000;
background: rgb(226,226,226); /* Old browsers */
background: -moz-linear-gradient(-45deg, rgba(226,226,226,.4) 0%, rgba(219,219,219,.4) 50%, rgba(209,209,209,.4) 51%, rgba(254,254,254,.4) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(-45deg, rgba(226,226,226,.4) 0%,rgba(219,219,219,.4) 50%,rgba(209,209,209,.4) 51%,rgba(254,254,254,.4) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(135deg, rgba(226,226,226,.4) 0%,rgba(219,219,219,.4) 50%,rgba(209,209,209,.4) 51%,rgba(254,254,254,.4) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
`;
const Clear = styled.div`
clear:both;
`;
const PopOverBody = styled.div`
width:50%;
min-width:300px;
background:white;
border-top:1px solid black;
border-left:1px  solid black;
border-right:2px solid black;
border-bottom:3px  solid black;
margin-left:auto;
margin-right:auto;
margin-top:3em;
padding:1em;
overflow:auto;
`;
const PopOverTitle = styled.div`
float:left;
text-decoration:underline;
`;