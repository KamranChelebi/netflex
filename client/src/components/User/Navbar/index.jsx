import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import "./index.scss";
import "animate.css";
import { useInformationContext } from "../../../context/InformationContext";
import Modal from "@mui/material/Modal";
import { useUserContext } from "../../../context/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#000000a1",
  border: "3px solid #DC1A28",
  boxShadow: 24,
  p: 5,
};

const drawerWidth = 240;

const UserNavbar = () => {
  const [user, setUser] = useUserContext();
  const [information, setInformation] = useInformationContext();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [setUser]);

  useEffect(() => {
    function handleScroll() {
      let scrolly = window.scrollY;
      if (scrolly > 250) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "black", height: "100%" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {information &&
          information.map((x) => {
            return (
              <img
                key={x._id}
                src={x.logoIMG}
                alt="logo"
                style={{ width: "100%", height: "100%" }}
              />
            );
          })}
      </Typography>
      <Divider />
      <List style={{ borderTop: "1px solid white" }}>
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "white" }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/movies">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "white" }}>
              <ListItemText primary="Movies" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/pricing">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "white" }}>
              <ListItemText primary="Pricing" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/blog">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "white" }}>
              <ListItemText primary="Blog" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/contacts">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "white" }}>
              <ListItemText primary="Contacts" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        className={scroll ? "scrolled" : ""}
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          left: "0",
          top: "0",
          padding: "20px 0",
          boxShadow: "none",
          zIndex: "999",
        }}
        position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {information &&
                information.map((x) => {
                  return (
                    <img
                      key={x._id}
                      src={x.logoIMG}
                      alt="logo"
                      style={{ width: "100%", height: "100%" }}
                    />
                  );
                })}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                color="error"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "flex" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              <NavLink
                style={{ textDecoration: "none" }}
                to="/"
                className={(navData) => (navData.isActive ? "active" : "none")}
              >
                <Button
                  className="nav-link"
                  sx={{ my: 2, mx: 2, display: "block" }}
                >
                  Home
                </Button>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to="/movies"
                className={(navData) => (navData.isActive ? "active" : "none")}
              >
                <Button
                  className="nav-link"
                  sx={{ my: 2, mx: 2, color: "white", display: "block" }}
                >
                  Movies
                </Button>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to="/pricing"
                className={(navData) => (navData.isActive ? "active" : "none")}
              >
                <Button
                  className="nav-link"
                  sx={{ my: 2, mx: 2, color: "white", display: "block" }}
                >
                  Pricing
                </Button>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to="/blog"
                className={(navData) => (navData.isActive ? "active" : "none")}
              >
                <Button
                  className="nav-link"
                  sx={{ my: 2, mx: 2, color: "white", display: "block" }}
                >
                  Blog
                </Button>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to="/contacts"
                className={(navData) => (navData.isActive ? "active" : "none")}
              >
                <Button
                  className="nav-link"
                  sx={{ my: 2, mx: 2, color: "white", display: "block" }}
                >
                  Contacts
                </Button>
              </NavLink>
            </Box>
            {user != null ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={user.username}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src={user.userIMG ? user.userIMG : ""}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link style={{ color: "black" }} to="/profile">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography fontSize="22px" textAlign="center">
                        Profile
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link style={{ color: "black" }} to="/favorites">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography fontSize="22px" textAlign="center">
                        Favorites
                      </Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      handleOpen();
                    }}
                  >
                    <Typography
                      color="black"
                      fontSize="22px"
                      textAlign="center"
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Link to="/register">
                <button className="signUpBTN">Sign Up</button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Logout modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="animate__animated animate__fadeInRight"
      >
        <Box className="modal-box" sx={style}>
          <Typography
            className="text-center"
            id="modal-modal-title"
            variant="h4"
            component="h2"
            style={{ color: "white", fontSize: "40px", fontWeight: "600" }}
          >
            Are You Sure?
          </Typography>
          <div className="btns mt-5 d-flex justify-content-between">
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setUser(null);
                navigate("/");
                handleClose();
              }}
              className="logoutBTNS"
            >
              Yes, Logout
            </button>
            <button onClick={handleClose} className="logoutBTNS">
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default UserNavbar;
