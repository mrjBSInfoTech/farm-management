// Fish farming recommendations based on water quality parameters
// Philippine farmable fish species

export const philippineFishSpecies = [
  {
    id: 1,
    name: "Tilapia (Bangus-like freshwater)",
    scientificName: "Oreochromis niloticus",
    phRange: { min: 6.5, max: 8.0 },
    temperatureRange: { min: 25, max: 35 },
    oxygenRange: { min: 5, max: 14 },
    turbidityRange: { min: 0, max: 40 },
    profitability: "High",
    growthRate: "Fast",
    marketDemand: "Very High",
    difficulty: "Easy",
    description: "Most popular and hardy freshwater fish in Philippines. Tolerates poor water quality well.",
  },
  {
    id: 2,
    name: "Catfish (Maliputo)",
    scientificName: "Clarias batrachus",
    phRange: { min: 6.5, max: 8.5 },
    temperatureRange: { min: 22, max: 32 },
    oxygenRange: { min: 3, max: 14 },
    turbidityRange: { min: 0, max: 50 },
    profitability: "High",
    growthRate: "Very Fast",
    marketDemand: "Very High",
    difficulty: "Easy",
    description: "Hardy fish that can tolerate low oxygen levels. Excellent for beginners.",
  },
  {
    id: 3,
    name: "Milkfish (Bangus)",
    scientificName: "Chanos chanos",
    phRange: { min: 7.0, max: 8.5 },
    temperatureRange: { min: 26, max: 32 },
    oxygenRange: { min: 6, max: 14 },
    turbidityRange: { min: 0, max: 30 },
    profitability: "Very High",
    growthRate: "Medium",
    marketDemand: "Very High",
    difficulty: "Medium",
    description: "Premium fish in Philippines. Preferred for coastal and brackish water farming.",
  },
  {
    id: 4,
    name: "Carp (Common Carp)",
    scientificName: "Cyprinus carpio",
    phRange: { min: 6.5, max: 8.0 },
    temperatureRange: { min: 20, max: 30 },
    oxygenRange: { min: 5, max: 14 },
    turbidityRange: { min: 0, max: 35 },
    profitability: "Medium-High",
    growthRate: "Medium",
    marketDemand: "Medium",
    difficulty: "Easy",
    description: "Adaptable and sturdy fish. Good for polyculture systems with other species.",
  },
  {
    id: 5,
    name: "Snakehead (Murrel)",
    scientificName: "Channa striata",
    phRange: { min: 6.0, max: 8.5 },
    temperatureRange: { min: 20, max: 32 },
    oxygenRange: { min: 2, max: 14 },
    turbidityRange: { min: 0, max: 50 },
    profitability: "Medium",
    growthRate: "Fast",
    marketDemand: "High",
    difficulty: "Easy",
    description: "Can survive in poor conditions. Very hardy and territorial.",
  },
  {
    id: 6,
    name: "Mullet (Eel grass mullet)",
    scientificName: "Mugil cephalus",
    phRange: { min: 7.0, max: 8.5 },
    temperatureRange: { min: 20, max: 32 },
    oxygenRange: { min: 5, max: 14 },
    turbidityRange: { min: 0, max: 40 },
    profitability: "Medium",
    growthRate: "Medium",
    marketDemand: "Medium",
    difficulty: "Medium",
    description: "Suitable for brackish water. Good for integrated farming systems.",
  },
  {
    id: 7,
    name: "Siganid (Rabbit fish)",
    scientificName: "Siganus rivulatus",
    phRange: { min: 7.5, max: 8.5 },
    temperatureRange: { min: 24, max: 32 },
    oxygenRange: { min: 5, max: 14 },
    turbidityRange: { min: 0, max: 20 },
    profitability: "Medium",
    growthRate: "Medium",
    marketDemand: "Medium",
    difficulty: "Medium",
    description: "Herbivorous fish. Great for integrated aqua-agriculture systems.",
  },
  {
    id: 8,
    name: "Grouper",
    scientificName: "Epinephelus coioides",
    phRange: { min: 7.5, max: 8.5 },
    temperatureRange: { min: 26, max: 32 },
    oxygenRange: { min: 6, max: 14 },
    turbidityRange: { min: 0, max: 15 },
    profitability: "Very High",
    growthRate: "Slow-Medium",
    marketDemand: "Very High",
    difficulty: "Hard",
    description: "High-value fish. Requires excellent water quality and careful management.",
  },
];

// Function to get fish recommendations based on water quality
export const getFishRecommendations = (waterQuality) => {
  const { ph, temperature, oxygen, turbidity } = waterQuality;

  return philippineFishSpecies
    .map((fish) => {
      let compatibilityScore = 100;
      const issues = [];

      // Check pH compatibility
      if (ph < fish.phRange.min || ph > fish.phRange.max) {
        compatibilityScore -= 30;
        issues.push(
          `pH ${ph.toFixed(1)} is outside ideal range (${fish.phRange.min}-${fish.phRange.max})`
        );
      }

      // Check temperature compatibility
      if (
        temperature < fish.temperatureRange.min ||
        temperature > fish.temperatureRange.max
      ) {
        compatibilityScore -= 25;
        issues.push(
          `Temperature ${temperature.toFixed(1)}°C is outside ideal range (${fish.temperatureRange.min}-${fish.temperatureRange.max}°C)`
        );
      }

      // Check oxygen compatibility
      if (oxygen < fish.oxygenRange.min || oxygen > fish.oxygenRange.max) {
        compatibilityScore -= 20;
        issues.push(
          `Oxygen ${oxygen.toFixed(1)} mg/L is outside ideal range (${fish.oxygenRange.min}-${fish.oxygenRange.max} mg/L)`
        );
      }

      // Check turbidity compatibility
      if (turbidity < fish.turbidityRange.min || turbidity > fish.turbidityRange.max) {
        compatibilityScore -= 15;
        issues.push(
          `Turbidity ${turbidity.toFixed(1)} NTU is outside ideal range (${fish.turbidityRange.min}-${fish.turbidityRange.max} NTU)`
        );
      }

      return {
        ...fish,
        compatibilityScore: Math.max(0, compatibilityScore),
        issues,
      };
    })
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};

// Function to get compatibility status and color
export const getCompatibilityStatus = (score) => {
  if (score >= 80) return { status: "Excellent", color: "#22C55E" };
  if (score >= 60) return { status: "Good", color: "#EAB308" };
  if (score >= 40) return { status: "Fair", color: "#F97316" };
  return { status: "Poor", color: "#EF4444" };
};
