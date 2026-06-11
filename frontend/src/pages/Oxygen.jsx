import { Box, Typography, Paper, Divider } from "@mui/material";

export default function Oxygen() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Dissolved Oxygen
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          The amount of oxygen gas dissolved in the water, which fish absorb through their gills. 
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Why it Matters */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Why Dissolved Oxygen Matters?
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          Dissolved oxygen (DO) is critical for aquatic agriculture and fish
          farming. Fish, shrimp, and other aquatic organisms require sufficient
          oxygen to survive and thrive. Low oxygen levels (hypoxia) can cause
          fish kills and damage aquatic ecosystems. Most aquatic life requires
          oxygen levels between 5-14 mg/L to maintain healthy growth and
          reproduction.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          In aquatic agriculture systems like pond farming and hydroponics,
          maintaining proper oxygen levels is essential for preventing bacterial
          growth and maintaining water quality. Without adequate oxygen,
          anaerobic bacteria can flourish, leading to ammonia buildup and toxic
          conditions for crops and livestock. Oxygen depletion can also cause
          sediment to release harmful substances into the water column.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          For aquatic plants and crops grown in water, oxygen in the root zone
          is equally important. Submerged vegetation produces oxygen during
          photosynthesis, but also consumes it during respiration. Fluctuating
          oxygen levels throughout the day can stress plants and reduce crop
          yields. Proper aeration systems help maintain consistent oxygen levels
          for optimal growth in aquatic agriculture.
        </Typography>
      </Box>

      {/* How it Affects Fish  */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          How it affects fish: 
        </Typography>
        
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>1.) Below 3 mg/L</b> - severe stress, feeding stops, fish gather at water inlets or gasp at the surface.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>2.) Below 2 mg/L</b> - death within hours.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>3.) Chronic low DO (3-4 mg/L)</b> - poor growth, weakened immunity, higher disease rates.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>4.) Supersaturation (less than 110% saturation)</b> - gas bubble disease (rare in farms, but possible from borewell water).
        </Typography>
      </Box>

      {/* Why People Should Care */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Why People Should Care?
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          For aquatic farmers and aquaculturists, monitoring oxygen levels
          directly impacts crop and livestock productivity. Low oxygen reduces
          fish growth rates, increases disease susceptibility, and can result in
          total crop loss. Properly oxygenated water ensures healthy aquatic
          produce, maintains system stability, and protects investment in
          farming operations. Regular oxygen monitoring helps prevent economic
          losses and ensures sustainable aquatic agriculture practices.
        </Typography>
      </Box>
    </Box>
  );
}
