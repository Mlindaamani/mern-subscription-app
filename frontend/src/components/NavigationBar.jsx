import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authStore } from "../stores/authStore";

export const NavigationBar = () => {
  const { logout, isAuthenticated, user } = authStore();
  const handleLogout = () => logout();
  return (
    <Navbar bg="success" fixed="top" className="mb-5">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-light">
          CREDOR
        </Navbar.Brand>

        <Nav className="me-auto">
          {isAuthenticated && user?.role === "creator" && (
            <>
              <Nav.Link as={Link} to="/upload" className="text-light">
                Upload Video
              </Nav.Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/videos" className="text-light">
                Videos
              </Nav.Link>

              <Nav.Link as={Link} to="/subscription" className="text-light">
                {user?.hasPaid ? "Upgrade" : "Subscribe"}
              </Nav.Link>

              <Nav.Link className="text-light" onClick={handleLogout}>
                Logout
              </Nav.Link>
              <Nav.Link className="text-light" as={Link} to="/chat">
                Chat
              </Nav.Link>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/register" className="text-light">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-light">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
