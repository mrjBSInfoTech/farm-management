import * as React from "react";
import { useState, useEffect } from "react";
import { AppProvider } from "@toolpad/core";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DashboardLayout as MuiDashboardLayout } from "@toolpad/core";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { modalStyles } from "../theme/modalTheme";
import { useNavigate, useLocation } from "react-router-dom";
import { Stack, Avatar, Typography, IconButton } from "@mui/material";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "../theme/customTheme";
import { createTheme } from "@mui/material/styles";

//Icons
import AirIcon from "@mui/icons-material/Air";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import DescriptionIcon from "@mui/icons-material/Description";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderIcon from "@mui/icons-material/Folder";
import OpacityIcon from "@mui/icons-material/Opacity";
import PersonIcon from "@mui/icons-material/Person";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WaterIcon from "@mui/icons-material/Water";


export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "user");
    setUser(storedUser);

    console.log(`Role from localStorage: ${storedRole}`);
    console.log("All localStorage items:", {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    });
  }, []);

  // Simulated router (for Toolpad)
  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/", { replace: true }); // redirect to your Dashboard page

    // Clear browser history for extra security
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
    };
  };

  // Check if current user is admin
  const isAdmin = role === "Administrator";

  // Sidebar menu items
  const navigation = [
    {
      segment: "guide",
      title: "Guide",
      icon: <MenuBookIcon />,
      pattern: "/dashboard",
    },
    { kind: "divider" },
    {
      segment: "information",
      title: "Information",
      icon: <InfoOutlineIcon />,
      children: [
        {
          segment: "phLevel",
          title: "PH Level",
          icon: <WaterDropIcon />,
        },
        {
          segment: "turbidity",
          title: "Turbidity",
          icon: <OpacityIcon />,
        },
        {
          segment: "temperature",
          title: "Temperature",
          icon: <ThermostatIcon />,
        },
        {
          segment: "oxygen",
          title: "Oxygen",
          icon: <BubbleChartIcon />,
        },
        {
          segment: "waterInfo",
          title: "Water Info",
          icon: <WaterIcon />,
        },
      ],
    },
    { kind: "divider" },
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
      pattern: "/dashboard",
    },
    ...(isAdmin
      ? [
          { kind: "divider" },
          {
            segment: "account",
            title: "Account",
            icon: <PersonIcon />,
            pattern: "/account",
          },
        ]
      : []),
    { kind: "divider" },
    {
      segment: "history",
      title: "History",
      icon: <HistoryIcon />,
      pattern: "/history",
    },
    { kind: "divider" },
    {
      segment: "about",
      title: "About",
      icon: <InfoOutlineIcon />,
    },
  ];

  const branding = {
    logo: <WaterDropIcon sx={{ fontSize: 30, fontColor: "white" }} />,
    title: (
      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        AquaWatch
      </Typography>
    ),
    homeUrl: "/guide",
  };

  // ✅ Sidebar footer (Account section)
  const SidebarFooter = ({ mini }) => (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={mini ? "center" : "space-between"}
      spacing={mini ? 0 : 1.5}
      sx={{
        p: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: theme.palette.background.sidebar,
        color: theme.palette.text.sidebar,
        // Force it down if the parent allows flex growth
        mt: "auto",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          }}
        >
          {getInitials(user)}
        </Avatar>
        {!mini && (
          <Stack direction="column">
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              User: {user}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Role: {role}
            </Typography>
          </Stack>
        )}
      </Stack>

      {!mini && (
        <IconButton size="small" onClick={handleOpen}>
          <ExitToAppIcon fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider navigation={navigation} branding={branding} router={router}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyles.medium}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Log out
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to log out?
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 3,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="primary"
                >
                  Logout
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
        <MuiDashboardLayout
          // ✅ This adds the account footer below the menus
          slots={{
            sidebarFooter: SidebarFooter,
          }}
          sx={{
            "& .MuiDrawer-paper .MuiBox-root": {
              display: "flex",
              flexDirection: "column",
              height: "100%",
            },

            "& .MuiDrawer-paper": {
              backgroundColor: theme.palette.background.sidebar,
              color: theme.palette.text.sidebar,
              borderRight: "none",
            },

            "& .MuiAppBar-root .MuiIconButton-root": {
              color: "#ffffff",
            },

            "& .MuiAppBar-root .MuiSvgIcon-root": {
              color: "#ffffff",
            },

            "& .MuiDrawer-paper .MuiPaper-root": {
              backgroundColor: theme.palette.background.sidebar,
            },
            // Selected text
            "& .MuiDrawer-paper .Mui-selected .MuiListItemText-primary": {
              color: "#2563eb",
            },

            // Selected icon
            "& .MuiDrawer-paper .Mui-selected .MuiSvgIcon-root": {
              color: "#2563eb",
            },

            // Sidebar icons color
            "& .MuiDrawer-paper .MuiSvgIcon-root": {
              color: "#ffffff",
            },

            // Sidebar text
            "& .MuiListItemButton-root": {
              color: "#ffffff",
              borderRadius: "8px",
              margin: "4px 2px",
            },

            // Sidebar icons
            "& .MuiListItemIcon-root": {
              color: "#ffffff",
              minWidth: 36,
            },

            // Hover effect
            "& .MuiListItemButton-root:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },

            // Active item
            "& .Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.25) !important",
            },

            // Header
            "& .MuiAppBar-root": {
              backgroundColor: theme.palette.background.header,
              boxShadow: "none",
            },
          }}
        >
          <Box
            sx={{
              padding: "20px",
              backgroundColor: "background.default", // Uses theme's background color
              minHeight: "100vh",
            }}
          >
            {children}
          </Box>
        </MuiDashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
