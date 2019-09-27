import React, { Component } from 'react';
import Message from '../../../../../../shared/context/Context';

export default class CodeEditor extends Component {
    state = {
        message: 'Minha',
        toggle: ()=>{this.setState({message: 'teste'});}, // Não funciona
    }

    render() {
        return (
            <>
                <Message.Provider value={this.state}>


                    <Message.Consumer>
                        {({ message, toggle }) => (<Msg message={message} toggle={toggle} />)}
                    </Message.Consumer>


                </Message.Provider>

            </>
        );
    }
}

const Msg = (props: any) => {
    return (
        <>
            <button onClick={() => props.toggle}>Teste</button>
            <div>{props.message}</div>
        </>
    );
}

