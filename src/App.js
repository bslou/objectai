import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Product from './Product';
import Solutions from './Solutions';
import SocialInequality from './SocialIneq';
import Playground from './Playground';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element = {<LandingPage/>} />
          <Route path='/Product' exact element = {<Product/>} />
          <Route path='/Solutions' exact element = {<Solutions/>} />
          <Route path='/Playground' exact element = {<Playground/>} />
          <Route path='/SocialInequality' exact element = {<SocialInequality/>} />
        </Routes>
      </BrowserRouter>    
    </ChakraProvider>
  );
}

export default App;
