import React from "react";
import UserIndex from "./UserIndex";
import TeacherClassPage from "./TeacherClassPage";
import StudentClassPage from "./StudentClassPage";
import AddWordList from "./AddWordList";
import Login from "./Login";
import Register from "./Register";
import PersonalInfo from "./PersonalInfo";
import ShowPersonalInfo from "./ShowPersonalInfo";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { ReactComponent as LogoSVG } from "./svgs/logo.svg";
import { ReactComponent as AvatarSVG } from "./svgs/avatar.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./App.css";
import { Result } from "antd";
import "antd/dist/antd.css";
import {
  AppBar,
  IconButton,
  Box,
  Toolbar,
  Typography,
  Container,
  Tooltip,
  Button,
} from "@mui/material";

function App(props) {
  const { location } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div
      className={
        location.pathname === "/" || location.pathname === "/Register"
          ? "login-content"
          : "content"
      }
    >
      <AppBar position="fixed" sx={{ backgroundColor: "	#FFFFFF" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LogoSVG sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: ".3rem",
                color: "#000000",
                fontSize: 24,
                marginLeft: 2,
              }}
            >
              <Link
                to="/UserIndex"
                style={{ color: "#000000", textDecoration: "none" }}
              >
                Vemorize
              </Link>
            </Typography>

            <Box style={{ marginLeft: 1200 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AvatarSVG />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography textAlign="center">John</Typography>
                </MenuItem>
                <Link to="/ShowPersonalInfo" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
                      個人資料
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
                      登出
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <Switch>
          <Route path="/PersonalInfo">
            <PersonalInfo />
          </Route>
          <Route path="/ShowPersonalInfo">
            <ShowPersonalInfo />
          </Route>

          <Route path="/UserIndex">
            <UserIndex />
          </Route>

          {/* HomePage 應該做if判斷 TeacherClass or StudentClass*/}
          {/* <Route path="/TeacherClass/:id" component>
            <TeacherClassPage />
          </Route> */}
          <Route path="/TeacherClass/:id" component={TeacherClassPage} />
          <Route path="/StudentClass/:id" component={StudentClassPage} />
          {/* <StudentClassPage />
          </Route> */}
          <Route path="/AddWord/:id/:wid" component={AddWordList} />

          <Route path="/AddWord/:id" component={AddWordList} />
          {/* <AddWordList />
          </Route> */}

          <Route path="/Register">
            <Register />
          </Route>

          <Route path="/" exact>
            <Login />
          </Route>
          <Route>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, 此頁面並不存在"
              extra={
                <Link to="/">
                  <Button type="primary">返回首頁</Button>
                </Link>
              }
              style={{ marginTop: "10%" }}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
