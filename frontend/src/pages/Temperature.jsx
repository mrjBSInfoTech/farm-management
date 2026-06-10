import { Box, Typography, Divider } from "@mui/material";

export default function Temperature() {
  return (
    <Box sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Temperature
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Indicates how hot or cold the water is, which affects water quality
          and aquatic life.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Why it Matters */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Why Temperature Matters?
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          In aquatic farming, water temperature is critical to fish and crop
          growth. Each farmed species has an optimal temperature range—most fish
          thrive between 20-30°C. Temperatures outside this range reduce
          appetite, slow growth, weaken immune systems, and increase disease
          susceptibility. Warmer water also holds less dissolved oxygen, which
          becomes critical for maintaining healthy stock. Temperature
          fluctuations stress aquatic organisms and reduce feed efficiency,
          directly impacting farm productivity and profitability.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          Sudden temperature changes, often caused by industrial discharge,
          deforestation, or climate change, can shock aquatic organisms and
          disrupt ecosystems. Temperature also affects the accuracy of other
          water quality measurements, such as pH and conductivity, making it an
          important parameter to monitor alongside other factors.
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
          For aquatic farmers, temperature control is vital for crop and
          livestock growth. Different species thrive in specific temperature
          ranges; too hot or too cold conditions stress fish, reduce feed
          efficiency, and increase disease susceptibility. Temperature
          fluctuations can also trigger stress responses that suppress immune
          systems. Farmers who maintain optimal water temperatures achieve
          faster growth rates, better survival rates, healthier aquatic
          organisms, and improved overall productivity. Proper temperature
          management is a key factor in maximizing profitability and ensuring
          long-term success in aquaculture operations.
        </Typography>
      </Box>
    </Box>
  );
}
