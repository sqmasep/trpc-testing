import { Container, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <Container>
      <MuiLink component={Link} to='/'>
        homepage
      </MuiLink>
    </Container>
  );
};

export default Navbar;
