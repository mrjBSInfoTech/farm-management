import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Slide,
  Snackbar,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { getIotData } from "../api/iotAPI";
import { saveHistory } from "../api/historyAPI";
import { getHistory } from "../api/historyAPI";
import { styled } from "@mui/material/styles";  
import Export from "../components/Dashboard/Export.jsx";
import { getFishRecommendations, getCompatibilityStatus } from "../utils/fishRecommendations";

// Icons
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WarningIcon from "@mui/icons-material/Warning";
import FishIcon from "@mui/icons-material/Pets";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// Slide Transition for Snackbar
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

// Styled component for the drop zone
const DropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragActive" && prop !== "hasError",
})(({ theme, isDragActive, hasError }) => ({
  width: "100%",
  minHeight: 200,
  border: `2px dashed ${
    hasError
      ? theme.palette.error.main
      : isDragActive
        ? theme.palette.primary.main
        : theme.palette.grey[400]
  }`,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  backgroundColor: isDragActive ? theme.palette.action.hover : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Animation transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      timeout={500}
      easing={{
        enter: "cubic-bezier(0.4, 0, 0.2, 1)",
        exit: "ease-out",
      }}
    />
  );
});

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(0);
  const [historyData, setHistoryData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const SAVE_COOLDOWN = 3000; // 3 seconds cooldown

  // Snackbar handlers
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  // 📁 Open Export Modal
  const handleOpenExport = () => {
    setOpenExport(true);
  };

  // 📁 Open Alert Dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const [iotData, setIotData] = useState({
    ph: 0,
    temperature: 0,
    turbidity: 0,
    oxygen: 0,
  });
  const [waterUsage, setWaterUsage] = useState("");
  const [fishRecommendations, setFishRecommendations] = useState([]);
  const [hasDataDetected, setHasDataDetected] = useState(false);

  // Helper functions for export
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getStatusLabel = (status) => {
    if (status && status.includes("drinking")) return "Drinking Water";
    if (status && status.includes("external")) return "External Use";
    return "Not Safe";
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIotData();
      setIotData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // realtime
    return () => clearInterval(interval);
  }, []);

  // Update fish recommendations whenever water quality changes
  useEffect(() => {
    if (iotData.ph > 0 && iotData.temperature > 0) {
      const recommendations = getFishRecommendations(iotData);
      setFishRecommendations(recommendations);
      setHasDataDetected(true);
    }
  }, [iotData]);

  // Fetch history data for export
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const data = await getHistory();
        setHistoryData(data);
      } catch (error) {
        console.error("Failed to fetch history data:", error);
      }
    };

    fetchHistoryData();
  }, []);

  // Safety standards
  const PH_GOOD_MIN = 6.5;
  const PH_GOOD_MAX = 8.5;

  const TURBIDITY_GOOD_MAX = 5; // NTU

  const TEMP_GOOD_MIN = 20; // °C
  const TEMP_GOOD_MAX = 30;

  const OXYGEN_GOOD_MIN = 5; // mg/L
  const OXYGEN_GOOD_MAX = 14; // mg/L

  const getStatusStyle = (status) => {
    switch (status) {
      case "Great":
        return {
          status: "Great",
          color: "#EAFBF0", // green
          iconColor: "#22C55E",
        };
      default:
        return {
          status: "Bad",
          color: "#FEE2E2", // red
          iconColor: "#EF4444",
        };
    }
  };

  // PH status
  const phStatus =
    iotData.ph >= PH_GOOD_MIN && iotData.ph <= PH_GOOD_MAX ? "Great" : "Bad";

  // Turbidity status
  const turbidityStatus =
    iotData.turbidity <= TURBIDITY_GOOD_MAX ? "Great" : "Bad";

  // Temperature status
  const tempStatus =
    iotData.temperature >= TEMP_GOOD_MIN && iotData.temperature <= TEMP_GOOD_MAX
      ? "Great"
      : "Bad";

  // Oxygen status
  const oxygenStatus =
    iotData.oxygen >= OXYGEN_GOOD_MIN && iotData.oxygen <= OXYGEN_GOOD_MAX
      ? "Great"
      : "Bad";

  const cards = [
    {
      title: "PH LEVEL",
      value: iotData.ph,
      ...getStatusStyle(phStatus),
      icon: (
        <ShowChartIcon sx={{ color: getStatusStyle(phStatus).iconColor }} />
      ),
    },
    {
      title: "TURBIDITY",
      value: iotData.turbidity,
      unit: "NTU",
      ...getStatusStyle(turbidityStatus),
      icon: (
        <OpacityIcon
          sx={{ color: getStatusStyle(turbidityStatus).iconColor }}
        />
      ),
    },
    {
      title: "TEMPERATURE",
      value: iotData.temperature,
      unit: "°C",
      ...getStatusStyle(tempStatus),
      icon: (
        <DeviceThermostatIcon
          sx={{ color: getStatusStyle(tempStatus).iconColor }}
        />
      ),
    },
    {
      title: "DISSOLVED OXYGEN",
      value: iotData.oxygen,
      unit: "mg/L",
      ...getStatusStyle(oxygenStatus),
      icon: (
        <BubbleChartIcon
          sx={{ color: getStatusStyle(oxygenStatus).iconColor }}
        />
      ),
    },
  ];

  // Update water usage whenever statuses change
  useEffect(() => {
    if (
      phStatus === "Bad" ||
      turbidityStatus === "Bad" ||
      tempStatus === "Bad" ||
      oxygenStatus === "Bad"
    ) {
      setWaterUsage("Water is not safe for farming.");
      handleOpenDialog();
    } else {
      setWaterUsage("Water is safe for farming.");
      closeDialog();
    }
  }, [phStatus, turbidityStatus, tempStatus, oxygenStatus]);

  const handleSaveData = async () => {
    const now = Date.now();

    // Check if cooldown is active
    if (now - lastSaveTime < SAVE_COOLDOWN) {
      const remainingTime = Math.ceil(
        (SAVE_COOLDOWN - (now - lastSaveTime)) / 1000,
      );
      setSnackbarMessage(`Please wait ${remainingTime}s before saving again`);
      setSnackbarOpen(true);
      return;
    }

    // Prevent multiple simultaneous saves
    if (isSaving) {
      setSnackbarMessage("⏳ Save in progress...");
      setSnackbarOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      await saveHistory({
        ph_level: iotData.ph,
        turbidity: iotData.turbidity,
        temperature: iotData.temperature,
        dissolved_oxygen: iotData.oxygen,
        water_status: waterUsage,
      });

      setLastSaveTime(Date.now());
      setSnackbarMessage("✅ Water quality data saved successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("❌ Failed to save data");
      setSnackbarOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  const exportAllHistoryCSV = () => {
    if (historyData.length === 0) return;

    const headers = [
      "Date",
      "Time",
      "pH Level",
      "Turbidity",
      "Temperature",
      "Status",
    ];

    const rows = historyData.map((row) => [
      dayjs(row.recorded_at).format("YYYY-MM-DD"),
      formatTime(row.recorded_at),
      row.ph_level,
      row.turbidity,
      row.temperature,
      row.oxygen,
      getStatusLabel(row.water_status),
    ]);

    const csvContent =
      headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Records.csv";
    link.click();
  };

  const exportAllHistoryExcel = () => {
    if (historyData.length === 0) return;

    const data = historyData.map((row) => ({
      Date: dayjs(row.recorded_at).format("YYYY-MM-DD"),
      Time: formatTime(row.recorded_at),
      "pH Level": row.ph_level,
      Turbidity: row.turbidity,
      Temperature: row.temperature,
      Oxygen: row.oxygen,
      Status: getStatusLabel(row.water_status),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "All History");

    XLSX.writeFile(workbook, "Records.xlsx");
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "background.default", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Real-time Overview
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Live monitoring from Station A-1
          </Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            height: { xs: 40, sm: 40 },
            width: { xs: 170, sm: 150 },
            minWidth: { xs: 45, sm: 50 },
            fontSize: { xs: 12, sm: 16 },
          }}
          onClick={handleOpenExport}
        >
          Export Data
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mt: 3,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 0,
              borderRadius: 3,
              backgroundColor: card.color,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent>
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#6B7280",
                  }}
                >
                  {card.title}
                </Typography>

                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </Box>
              </Stack>

              {/* Value */}
              <Typography
                fontSize={32}
                fontWeight="bold"
                sx={{ color: "black" }}
              >
                {card.value}
                <Typography component="span" fontSize={14} ml={0.5}>
                  {card.unit}
                </Typography>
              </Typography>

              {/* Footer */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Chip
                  label={card.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      card.status === "Great"
                        ? "#EAFBF0"
                        : card.status === "Good"
                          ? "#FFF7ED"
                          : "#FEE2E2",
                    borderColor:
                      card.status === "Great"
                        ? "#22C55E"
                        : card.status === "Good"
                          ? "#F59E0B"
                          : "#EF4444",
                    color:
                      card.status === "Great"
                        ? "#22C55E"
                        : card.status === "Good"
                          ? "#F59E0B"
                          : "#EF4444",
                    fontWeight: "bold",
                    borderRadius: 5,
                  }}
                  variant="outlined"
                />
                <Typography fontSize={12} color="gray">
                  Just now
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
      {/* IOT Info */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Paper
          sx={{
            p: { xs: 3, md: 3 },
            mt: 3,
            borderRadius: 3,
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              mb: 2,
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: { xs: 1, md: 2 },
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Water Quality Analysis
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSaveData}
              disabled={isSaving}
              sx={{
                borderRadius: 1,
                height: { xs: 35, sm: 40 },
                width: { xs: "100%", sm: 150 },
                fontSize: { xs: 12, sm: 16 },
              }}
            >
              {isSaving ? "Saving..." : "Save Data"}
            </Button>
          </Box>
          {/* Add your chart/content here */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: waterUsage.includes("not safe") ? "#FFF3E0" : "#E8F5E9",
              borderRadius: 3,
              p: { xs: 1.5, sm: 3 },
              width: "100%",
              overflow: "auto",
              boxSizing: "border-box",
              border: `2px solid ${waterUsage.includes("not safe") ? "#FF9800" : "#4CAF50"}`,
              position: "relative",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              {waterUsage.includes("not safe") ? (
                <CheckCircleIcon
                  sx={{
                    fontSize: 60,
                    color: "#FF9800",
                    mb: 2,
                  }}
                />
              ) : (
                <WarningIcon
                  sx={{
                    fontSize: 60,
                    color: "#4CAF50",
                    mb: 2,
                  }}
                />
              )}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: waterUsage.includes("not safe")
                    ? "#E65100"
                    : "#2E7D32",
                  mb: 1,
                }}
              >
                {waterUsage.includes("not safe")
                  ? "Not Safe for Farming"
                  : "Safe for Farming"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  mb: 2,
                }}
              >
                {waterUsage}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  mt: 3,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 0.5 }}
                  >
                    pH Level
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: phStatus === "Great" ? "#22C55E" : "#EF4444",
                    }}
                  >
                    {iotData.ph}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 0.5 }}
                  >
                    Turbidity
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color:
                        turbidityStatus === "Great" ? "#22C55E" : "#EF4444",
                    }}
                  >
                    {iotData.turbidity} NTU
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 0.5 }}
                  >
                    Temperature
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: tempStatus === "Great" ? "#22C55E" : "#EF4444",
                    }}
                  >
                    {iotData.temperature}°C
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 0.5 }}
                  >
                    Dissolve Oxygen
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: tempStatus === "Great" ? "#22C55E" : "#EF4444",
                    }}
                  >
                    {iotData.oxygen} mg/L
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Farmable Fish Recommendations Section */}
          {hasDataDetected && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Recommended Farmable Fish for Philippines
              </Typography>
            </Box>

            {/* Fish Recommendations Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
                gap: 2,
              }}
            >
              {fishRecommendations.slice(0, 6).map((fish) => {
                const compatibility = getCompatibilityStatus(fish.compatibilityScore);
                return (
                  <Paper
                    key={fish.id}
                    sx={{
                      p: 2,
                      border: `2px solid ${compatibility.color}`,
                      borderRadius: 2,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 4px 12px ${compatibility.color}33`,
                      },
                    }}
                  >
                    {/* Fish Header */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          mb: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", fontSize: "1rem" }}
                          >
                            {fish.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", fontStyle: "italic" }}
                          >
                            {fish.scientificName}
                          </Typography>
                        </Box>
                        <Chip
                          label={compatibility.status}
                          sx={{
                            backgroundColor: compatibility.color,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>

                      {/* Compatibility Score Bar */}
                      <Box sx={{ mb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            Compatibility
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: "bold",
                              color: compatibility.color,
                            }}
                          >
                            {fish.compatibilityScore}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={fish.compatibilityScore}
                          sx={{
                            height: 8,
                            borderRadius: 2,
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: compatibility.color,
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Fish Details */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 1,
                          mb: 1.5,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              display: "block",
                              mb: 0.25,
                            }}
                          >
                            Growth Rate
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {fish.growthRate}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              display: "block",
                              mb: 0.25,
                            }}
                          >
                            Difficulty
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {fish.difficulty}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              display: "block",
                              mb: 0.25,
                            }}
                          >
                            Profitability
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {fish.profitability}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              display: "block",
                              mb: 0.25,
                            }}
                          >
                            Market Demand
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {fish.marketDemand}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      {/* Parameter Ranges */}
                      <Box sx={{ mb: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: "bold",
                            display: "block",
                            mb: 0.75,
                            color: "text.secondary",
                          }}
                        >
                          Ideal Water Parameters:
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                          <Typography variant="caption">
                            <strong>pH:</strong> {fish.phRange.min} - {fish.phRange.max}
                          </Typography>
                          <Typography variant="caption">
                            <strong>Temp:</strong> {fish.temperatureRange.min}°C -{" "}
                            {fish.temperatureRange.max}°C
                          </Typography>
                          <Typography variant="caption">
                            <strong>DO:</strong> {fish.oxygenRange.min} - {fish.oxygenRange.max}{" "}
                            mg/L
                          </Typography>
                          <Typography variant="caption">
                            <strong>Turbidity:</strong> {fish.turbidityRange.min} -{" "}
                            {fish.turbidityRange.max} NTU
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Issues / Notes */}
                    {fish.issues.length > 0 ? (
                      <Alert severity="warning" sx={{ mb: 1 }}>
                        {fish.issues.map((issue, idx) => (
                          <Typography key={idx} variant="caption" display="block">
                            • {issue}
                          </Typography>
                        ))}
                      </Alert>
                    ) : (
                      <Alert severity="success" sx={{ mb: 1 }}>
                        <Typography variant="caption">
                          ✓ Current conditions are excellent for this fish!
                        </Typography>
                      </Alert>
                    )}

                    {/* Description */}
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        fontStyle: "italic",
                      }}
                    >
                      {fish.description}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          </Box>
          )}

          {waterUsage.includes("not safe") && (
            <Dialog
              open={openDialog}
              onClose={closeDialog}
              TransitionComponent={Transition}
              keepMounted
              PaperProps={{
                sx: { minWidth: "300px" },
              }}
            >
              <DialogTitle sx={{fontWeight: "bold"}}>
                Water Condition Alert
              </DialogTitle>
              <DialogContent>
                <Typography>
                  The water condition is not safe for farming.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDialog} color="secondary" >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Paper>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarMessage.includes("❌") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Export
        open={openExport}
        handleClose={() => setOpenExport(false)}
        onExportCSV={exportAllHistoryCSV}
        onExportExcel={exportAllHistoryExcel}
      />
    </Box>
  );
}
