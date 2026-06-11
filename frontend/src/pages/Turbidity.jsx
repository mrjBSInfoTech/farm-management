import { Box, Typography, Divider } from "@mui/material";

export default function Turbidity() {
  return (
    <Box 
      sx={{ 
        p: 3, 
        backgroundColor: "background.paper",
        minHeight: "100%",             
        boxSizing: "border-box"            
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Turbidity
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Cloudiness caused by suspended clay, silt, algae, or organic
          particles. It affects fish mostly indirectly by interfering with
          behavior and gill function.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Why it Matters */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Why turbidity Matters?
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          For aquaculture and aquatic farming, high turbidity directly impacts
          crop and livestock performance. Suspended particles reduce light
          penetration into the water, limiting photosynthesis for aquatic plants
          and algae that produce oxygen. This reduces oxygen levels in the
          water, stressing fish and other aquatic organisms. High turbidity can
          also indicate algae blooms or contamination that poses health risks to
          farmed species, reducing yields and profitability.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          High turbidity also makes water treatment more difficult and expensive
          because the particles can protect bacteria from disinfection.
          Sediments may clog filters and reduce the efficiency of filtration
          systems. In natural water bodies, cloudy water blocks sunlight,
          preventing aquatic plants from photosynthesizing properly. This
          reduces oxygen production, negatively affecting fish and other aquatic
          organisms.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          Turbidity can increase after heavy rainfall, flooding, agricultural
          runoff, or improper waste disposal. Continuous monitoring allows early
          detection of these conditions and prevents contaminated water from
          being consumed.
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
          <b>1.) Clogs gills</b> - abrasive particles cause inflammation, excess mucus, and bacterial gill disease.     
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>2.) Impedes feeding</b> - most farmed fish are visual feeders; high turbidity makes it hard to find pellets, reducing growth and increasing feed waste.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>3.) Blocks sunlight</b> - kills beneficial algae that produce oxygen - worsens nighttime DO crashes.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>4.) Smothers eggs</b> - suspended solids settle on spawning substrates, suffocating eggs and fry.  
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
          For aquatic farmers, high turbidity directly impacts crop and
          livestock performance. Excessive suspended particles block sunlight
          needed for aquatic plant photosynthesis, reducing oxygen production
          and crop growth. Turbidity also indicates potential contamination or
          algae blooms that can harm fish health and survival. Farmers
          monitoring turbidity can detect water quality problems early, clean
          filtration systems, and adjust management practices to maintain
          optimal growing conditions, protect their aquaculture investments, and
          ensure sustainable yields.
        </Typography>
      </Box>
    </Box>
  );
}
