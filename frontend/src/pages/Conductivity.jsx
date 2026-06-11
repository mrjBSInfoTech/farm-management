import { Box, Typography, Divider } from "@mui/material";

export default function Conductivity() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Conductivity
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
           A measure of dissolved salts/ions (electrolytes) in water. It tells you how much energy fish must spend to regulate their internal salt balance (osmoregulation).
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Why it Matters */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Why Conductivity Matters?
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          In aquaculture, conductivity directly affects the osmoregulation of aquatic organisms. Most freshwater fish and shrimp thrive in a conductivity range of 500-1500 µS/cm. When conductivity becomes too low or too high, it stresses aquatic life and forces their bodies to expend energy maintaining salt balance. Abnormal conductivity also indicates the presence of dissolved minerals, pollutants, or contamination that can affect water quality and organism health.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          For aquatic farmers, conductivity is a quick indicator of water chemistry changes. Sudden spikes may indicate fertilizer runoff, manure leakage, or industrial contamination. Stable conductivity helps ensure predictable growth rates, reduces disease outbreaks, and minimizes the need for emergency water treatments. Conductivity monitoring also helps detect early signs of ecosystem stress before it becomes a production crisis.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          In addition, conductivity affects the effectiveness of water treatment processes and the availability of essential nutrients for both plants and fish. Abnormal conductivity levels may alter taste and odor, making water unsuitable for consumption or irrigation. Monitoring conductivity alongside other water parameters helps maintain a balanced aquatic ecosystem for sustainable farming operations.
        </Typography>
      </Box>

      {/* How it Affects Fish */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          How it affects fish:
        </Typography>

        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>1.) Too low (&lt;50 µS/cm)</b> - water is extremely pure (like rainwater). Salts constantly leach out of the fish's gills.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>2.) Too high (&gt;500–2000 µS/cm, species-dependent)</b> - freshwater fish must actively pump out excess salts.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>3.) Sudden change</b> - osmotic shock. Moving fish from low to high conductivity water without acclimation can kill within hours.
        </Typography>
      </Box>

      {/* Conductivity as a Farm Tool */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Conductivity as a farm tool:
        </Typography>

        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>1.) Detect pollution</b> – A sudden spike indicates fertilizer, manure, or wastewater entering the pond.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          <b>2.) Dosage aid</b> – Adding a small amount of salt (raising conductivity) reduces nitrite toxicity and relieves stress during handling.
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
          For aquatic farmers, maintaining proper conductivity is critical for crop and livestock productivity. Most freshwater fish and aquatic plants thrive in a conductivity range of 500-1500 µS/cm. Incorrect conductivity levels weaken fish immunity, reduce nutrient uptake by crops, and promote algae blooms that can suffocate aquatic life. Farmers who monitor conductivity can optimize growth rates, reduce disease outbreaks, and maximize yields. Stable conductivity also minimizes the need for expensive chemical treatments and emergency interventions, helping maintain a healthy and sustainable aquatic farming ecosystem.
        </Typography>
      </Box>
    </Box>
  );
}