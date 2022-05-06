import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Feed from './Feed';
import Question from './Question';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <AppWrapper>
          <Header />
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/questions/:qId' element={<Question />} />
            <Route path='/questions/*' element={<Feed />} />              
            <Route 
              path='*' 
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There is nothing here !</p>
                </main>
              }
            />
          </Routes>            
        </AppWrapper>
      </>
    );
  }
}

export default App;
