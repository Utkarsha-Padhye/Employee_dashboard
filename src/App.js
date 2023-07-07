import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Home } from './components/Home';
import { Filter } from './components/Filter';
import { Sortbyname } from './components/Sortbyname';

function BasicExample() {
  return (
    <BrowserRouter>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      {/* //<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav variant="pills" defaultActiveKey="/Home">
            <Nav.Link as={Link} to="/Home">Home</Nav.Link>
            <Nav.Link as={Link} to="/Filter">Filter</Nav.Link>
            </Nav>
            <NavDropdown title="Sort" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/sortbyname">Sort By Name</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/filter" element={<Filter/>}/>
        <Route path="/sortbyname" element={<Sortbyname/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default BasicExample;