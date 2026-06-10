import { Box, Typography, Paper, Divider } from "@mui/material";

export default function PHLevel() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          PH Level
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Measures how acidic or basic the water is on a scale of 0–14. A pH of
          7 is neutral.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Why it Matters */}
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Why pH Level Matters?
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          In aquaculture, pH level directly affects the health and survival of farmed aquatic organisms. Most fish and shrimp thrive in a pH range of 6.5-8.5. When pH becomes too acidic or too alkaline, it stresses aquatic life, inhibits nutrient absorption, and reduces growth rates. Abnormal pH also affects nutrient availability in the water—alkaline water can lock up essential minerals needed for plant and fish growth, while acidic water can make toxic metals more available.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          In addition, abnormal pH levels can reduce the effectiveness of water
          treatment processes such as chlorination and filtration. Extremely
          acidic or alkaline water may alter taste and odor, making the water
          unpleasant and unsafe for consumption. Sudden changes in pH may also
          indicate chemical pollution or industrial contamination.
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, color: "text.secondary" }}
        >
          For aquatic life, pH levels are especially important. Fish, insects,
          and plants can only survive within a narrow pH range. If the pH
          changes too much, it can stress or kill aquatic organisms and disrupt
          entire ecosystems. Maintaining a balanced pH helps ensure safe
          drinking water, protects infrastructure, and supports healthy rivers,
          lakes, and oceans.
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
          For aquatic farmers, maintaining proper pH is critical for crop and
          livestock productivity. Most aquatic plants and fish thrive in a pH
          range of 6.5-8.5. Incorrect pH levels reduce nutrient uptake by crops,
          weaken fish immunity, and promote algae blooms that can suffocate
          fish. Farmers who monitor pH can optimize growth rates, reduce disease
          outbreaks, and maximize yields. Stable pH also minimizes the need for
          expensive chemical treatments and helps maintain a healthy aquatic
          ecosystem for sustainable farming operations.
        </Typography>
      </Box>
    </Box>
  );
}
