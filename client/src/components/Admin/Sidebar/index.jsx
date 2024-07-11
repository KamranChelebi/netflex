import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import {
  Avatar,
  Button,
  Container,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
} from "@mui/material";
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

const Sidebar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useUserContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoading(false);
    }
  }, [setUser]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      style={{ backgroundColor: "#DC1A28", height: "150vh" }}
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/admin/dashboard">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Dashboard"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/slider">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Slider"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/movies">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Movies"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/movies-category">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Movies Category"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/movies-language">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Movies Language"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/movies-quality">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Movies Quality"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/movieoftheday">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Movie of the Day"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/subscribers">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Subscribers"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/services">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Services"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/pricing">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Pricing"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/informations">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Informations"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/contacts">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Messages"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/blogs">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Blogs"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/blogs-category">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Blogs Category"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/socials">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Socials"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/admin/users">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                style={{ color: "white", textAlign: "center" }}
                primary="Users"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {loading ? (
        <section id="loader">
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>
          </div>
        </section>
      ) : (
        <>
          <AppBar
            position="static"
            style={{ backgroundColor: "#100F17", padding: "10px 0" }}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Button
                  style={{ color: "#DC1A28" }}
                  onClick={toggleDrawer("left", true)}
                >
                  <MenuIcon style={{ fontSize: "40px" }} />
                </Button>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/admin/dashboard"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Netflex Admin
                </Typography>

                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Netflex Admin
                </Typography>

                <Box sx={{ flexGrow: 0 }} style={{ marginLeft: "auto" }}>
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
                    <Link style={{ color: "black" }} to="/admin/profile">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography fontSize="22px" textAlign="center">
                          Profile
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
          <React.Fragment>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </React.Fragment>
        </>
      )}
    </>
  );
};

export default Sidebar;
