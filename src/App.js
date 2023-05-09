import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Project from "./components/pages/Project";

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>
          <Route path="/costs/" element={<Home/>}/>
          <Route path="/costs/projects" element={<Projects/>}/>
          <Route path="/costs/company" element={<Company/>}/>
          <Route path="/costs/contact" element={<Contact/>}/>
          <Route path="/costs/newproject" element={<NewProject/>}/>
          <Route path="/costs/project/:id" element={<Project/>}/>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;