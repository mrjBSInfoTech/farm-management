import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  useTheme,
  Container,
} from "@mui/material";
import {
  WaterDrop as WaterDropIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

export default function Guide() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);

  // Check if user has visited the guide before
  useEffect(() => {
    const hasVisited = localStorage.getItem("guideViewed");
    if (!hasVisited) {
      setShowGuide(true);
    }
  }, []);

  const handleStartGuide = () => {
    setShowGuide(false);
    localStorage.setItem("guideViewed", "true");
  };

  // Show start button if guide hasn't been viewed
  if (showGuide) {
    return (
      <Container
        maxWidth={false}
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, sm: 5 },
            textAlign: "center",
            maxWidth: 500,
            borderRadius: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <WaterDropIcon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Welcome to AquaWatch
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.95 }}>
            Learn how to use the water monitoring system to track water quality
            and ensure optimal conditions for your farming operations.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartGuide}
            sx={{
              backgroundColor: "white",
              color: "#5E60CE",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Start Learning
          </Button>
        </Paper>
      </Container>
    );
  }

  // Show guide content after user clicks start
  return (
    <Box sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          User Guide
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            flex: "1 1 1000px",
            maxWidth: 1200,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[2],
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Paper
              sx={{
                p: 1.5,
                bgcolor: "secondary.main",
                color: "indigo",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 50,
                height: 50,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              1
            </Paper>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Installation
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Connect the sensor probe to the main unit and submerge in water
                source.
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            flex: "1 1 1000px",
            maxWidth: 1200,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[2],
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Paper
              sx={{
                p: 1.5,
                bgcolor: "secondary.main",
                color: "indigo",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 50,
                height: 50,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              2
            </Paper>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Calibration
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Use the calibration button to zero the sensors before first use.
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            flex: "1 1 1000px",
            maxWidth: 1200,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[2],
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Paper
              sx={{
                p: 1.5,
                bgcolor: "secondary.main",
                color: "indigo",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 50,
                height: 50,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              3
            </Paper>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Monitoring
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Watch real-time data on the dashboard. Green indicators mean
                safe levels.
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            flex: "1 1 1000px",
            maxWidth: 1200,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[2],
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Paper
              sx={{
                p: 1.5,
                bgcolor: "secondary.main",
                color: "indigo",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 50,
                height: 50,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              4
            </Paper>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Filtration
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                The system automatically engages filters when turbidity exceeds
                2.0 NTU.
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard")}
          sx={{
            fontSize: 16,
            width: { xs: "100%", sm: 150 },
            height: 50,
            padding: 0,
            borderRadius: 2,
            mt: 3,
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
