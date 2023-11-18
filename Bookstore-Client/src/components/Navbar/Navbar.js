import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { ExitToApp, ShoppingCart } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenTimestamp");
    setIsLoggedIn(false);
    history.push("/login");
  };
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit">
            <img
              src={logo}
              alt="Book Store App"
              height="50px"
              className={classes.image}
            />
            <strong>BooK-IT</strong>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.button}>
            {!isLoggedIn ? (
              <Tooltip title="Login" arrow>
                <IconButton
                  component={Link}
                  to="/login"
                  aria-label="Login items"
                  color="inherit">
                  <Badge badgeContent={totalItems} color="secondary">
                    <PersonIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Cart" arrow>
                  <IconButton
                    component={Link}
                    to="/cart"
                    aria-label="Show cart items"
                    color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile" arrow>
                  <IconButton
                    component={Button}
                    onClick={handleClick}
                    color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                      <PersonIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push("/myorder");
                    }}>
                    My Order
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
