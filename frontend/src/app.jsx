import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

/* Components */
import { 
  Header,
  Home,
  Footer,
  Watch,
  ListIcons
} from './components/.export';

const Main = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/music' element={<Watch />} />
        <Route path='/icons' element={<ListIcons />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Main;