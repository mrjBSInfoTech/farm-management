import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Account from "./pages/Account";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Guide from "./pages/Guide";
import Conductivity from "./pages/Conductivity";
import PHLevel from "./pages/PHLevel";
import Temperature from "./pages/Temperature";
import Turbidity from "./pages/Turbidity";
import History from "./pages/History";
import HealthInfo from "./pages/HealthInfo";
import Oxygen from "./pages/Oxygen";
import theme from './theme/fontTheme';
import Welcome from "./Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline resets browser default styles for consistency */}
      <CssBaseline />
      <Router>
        <Routes>
          {/* First Page */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Dashboard Pages */}
          <Route
            path="/guide"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <Guide />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/information/phLevel"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <PHLevel />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/information/temperature"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <Temperature />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/information/turbidity"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <Turbidity />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/information/oxygen"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <Oxygen />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/information/healthInfo"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <HealthInfo />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/information/conductivity"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <Conductivity />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/about"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <About />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <Account />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <History />
                </Sidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <Sidebar>
                  <About />
                </Sidebar>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
