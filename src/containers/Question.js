import React, { Component } from "react";
import styled from "styled-components";
import withRouter from  "../withRouter";
import Card from "../components/Card/Card";

const QuestionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

const Alert = styled.div`
    text-align: center;
`;

const ROOT_API = 'https://api.stackexchange.com/2.3/';

class Question extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: true,
            error: '',
        };
    }

    async componentDidMount() {

        try {
            const data = await fetch(
                `${ROOT_API}questions/${this.props.params.qId}?site=stackoverflow`,
            );
            const dataJSON = await data.json();

            if ( dataJSON ) {
                this.setState({
                    data: dataJSON,
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                loading: false,
                error: error.message,
            });
        }
    }

    render() {
        const { data, loading, error } = this.state;

        if ( loading || error ) {
            return <Alert>{ loading ? 'Loading...' : error }</Alert>;
        }

        return (
            <QuestionWrapper>
                <Card key={data.items[0].question_id} data={data.items[0]} />
            </QuestionWrapper>
        );
    }
}

export default withRouter(Question);