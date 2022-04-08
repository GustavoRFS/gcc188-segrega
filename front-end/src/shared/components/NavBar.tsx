import { AppBar, Box, Container, Toolbar, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Button } from "./index";
import Logo from "../../assets/Logo.svg";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../store";

const pages = [
  { label: "Início", href: "/inicio" },
  { label: "Perfil", href: "/perfil" },
  { label: "Admin", href: "/admin" },
];

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState(0);
  const history = useHistory();

  const handleChangePage = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentPage(newValue);
    history.push(pages[newValue].href);
  };

  const { dispatch } = useAppContext();

  return (
    <AppBar position="sticky" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="Logo" style={{ height: 50, marginRight: 10 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Tabs value={currentPage} onChange={handleChangePage}>
              {pages.map((page, index) => {
                return (
                  <Tab
                    key={index}
                    style={{
                      height: 65,
                      width: 105,
                      fontWeight: "500",
                      textTransform: "none",
                    }}
                    label={page.label}
                  />
                );
              })}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={() => {
                dispatch({ type: "CURRENT_USER", payload: undefined });
                history.push("/login");
              }}
              style={{ width: 100 }}
              variant="contained"
            >
              Sair
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
