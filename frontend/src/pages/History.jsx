import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
  Chip,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getHistory } from "../api/historyAPI";

export default function History() {
  const isAdmin = localStorage.getItem("role")?.toLowerCase() === "admin" || localStorage.getItem("role") === "Administrator";
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(isAdmin ? null : dayjs());

  const getStatusColor = (status) => {
    if (status && status.includes("not safe")) return "#FF9800";
    if (status && status.includes("not safe")) return "#4CAF50";
    return "#F44336";
  };

  const getStatusLabel = (status) => {
    if (status && status.includes("drinking")) return "Drinking Water";
    if (status && status.includes("external")) return "External Use";
    return "Not Safe";
  };

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

  const filterDataByDate = (data) => {
    // Admins: show all data by default, users: show only today's data
    if (!selectedDate) {
      return isAdmin ? data : [];
    }
    
    const selectedDay = dayjs(selectedDate).format("YYYY-MM-DD");
    return data.filter((item) => {
      const itemDay = dayjs(item.recorded_at).format("YYYY-MM-DD");
      return itemDay === selectedDay;
    });
  };

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        const data = await getHistory();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  const filteredData = filterDataByDate(historyData);
  
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Reading History
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {isAdmin ? "All users' water quality readings" : "Today's water quality readings"}
          </Typography>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={isAdmin ? "Filter by Date" : "Select Date"}
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            enableAccessibleFieldDOMStructure={false}
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
              },
            }}
            sx={{
              width: { xs: "100%", sm: 200 },
            }}
          />
        </LocalizationProvider>
      </Box>

      {/* History Data Display */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
          <CircularProgress />
        </Box>
      ) : filteredData.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }} variant="outlined">
          <Typography sx={{ color: "text.secondary" }}>
            No data available for {dayjs(selectedDate).format("MMMM DD, YYYY")}
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 2, borderRadius: 2, overflowX: "auto" }} variant="outlined">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  {isAdmin && (
                    <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
                      User
                    </TableCell>
                  )}
                  <TableCell sx={{ fontWeight: "bold", minWidth: 100 }}>
                    Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 100 }} align="center">
                    pH Level
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 120 }} align="center">
                    Turbidity (NTU)
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 130 }} align="center">
                    Temperature (°C)
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 130 }} align="center">
                    Dissolved Oxygen (mg/L)
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 130 }} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f9f9f9",
                      },
                      borderLeft: `4px solid ${getStatusColor(row.water_status)}`,
                    }}
                  >
                    {isAdmin && (
                      <TableCell sx={{ fontWeight: 600 }}>
                        {row.username}
                      </TableCell>
                    )}
                    <TableCell sx={{ fontWeight: 600 }}>
                      {formatTime(row.recorded_at)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      {row.ph_level}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      {row.turbidity}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      {row.temperature}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      {row.dissolved_oxygen}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getStatusLabel(row.water_status)}
                        sx={{
                          backgroundColor: getStatusColor(row.water_status),
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
