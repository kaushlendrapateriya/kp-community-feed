import React, { Component }  from "react";
import styled from 'styled-components';
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import withRouter from "../withRouter";
import queryString from 'query-string';
import Helmet from "react-helmet";

const FeedWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

const Alert = styled.div`
    text-align: center;
`;

const CardLink = styled(Link)`
    text-decoration:none;
    color: inherit;
`;

const PaginationBar = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const PaginationLink = styled(Link)`
    padding: 1%;
    background: lightBlue;
    color: white;
    text-decoration: none;
    border-radius: 5px;
`;

const ROOT_API = 'https://api.stackexchange.com/2.3/';

class Feed extends Component {
    constructor(props) {
        super(props);
        const query = queryString.parse( props.location.search );
        this.state = {
            data: [],
            loading: true,
            page: (query.page) ? parseInt( query.page ) : 1,
            error: '',
        };
    }

    async fetchApi(page) {
        try {
            const data = await fetch(
                `${ROOT_API}questions?order=desc&sort=activity&tagged=reactjs&site=stackoverflow${ (page) ? `&page=${page}` : '' }`,
            );
            const dataJSON = await data.json();

            if (dataJSON) {
                this.setState({
                    data: dataJSON,
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                loading: false,
                error: error.message,
            })
        }
    }
    
    componentDidMount() {
        const { page }  = this.state; 
        this.fetchApi(page);
    }

    componentDidUpdate( prevProps ) {
        if ( prevProps.location.search !== this.props.location.search ) {
            const query = queryString.parse( this.props.location.search );
            this.setState({ page: parseInt(query.page) }, () => 
                this.fetchApi(this.state.page)
            ); 
        }
    }

    render() {
        const { data, page, loading, error } = this.state;

        if (loading || error) {
            return(
                <>
                    <Helmet>
                        <title>Q&A Feed - Questions</title>
                    </Helmet>
                    <Alert>{loading ? 'Loading...' : error}</Alert>
                </>
            );
        }

        return (
            <FeedWrapper>
                {data.items.map(item => (
                    <CardLink key={item.question_id}
                        to={`/questions/${item.question_id}`}>
                        <Card data={item} />    
                    </CardLink>                    
                ))}
                <PaginationBar>
                    {page > 1 && <PaginationLink to={`/questions/?page=${page-1}`}>Previous</PaginationLink>}
                    {data.has_more && <PaginationLink to={`/questions/?page=${page+1}`}>Next</PaginationLink>}
                </PaginationBar>
            </FeedWrapper>
        );
    }
}

export default withRouter(Feed);