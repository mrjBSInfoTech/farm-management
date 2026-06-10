import {
  Box,    
  Card, 
  CardContent, 
  Paper,
  Typography, 
} from "@mui/material";

export default function About() {
  return (
    <Box sx={{ p: 3,display: "flex", flexDirection: "column", alignItems: "center", overflow:"hidden" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        About the Project
      </Typography>
      <Box sx={{ mt: 2, maxWidth: 750, textAlign: "center", lineHeight: 1.6 }}>
        <Typography variant="body1" sx={{ mt: 2 }} >
          QUANTMETH Group 7 presents a Smart Water Monitoring for farmers to sustain fish farming. 
          Our solution integrates advanced lot sensors with 
          automated filtration to ensure quality water for aquaculture.
        </Typography>
      </Box>
      <Typography sx={{mt:5, fontWeight:'bold', fontSize:25}}>
        Meet the Team
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, mt: 3 }}>
        <Card sx={{p:2, width:260, height:220, display:"flex", flexDirection:"column", alignItems:"center"}}>
          <CardContent>
            <Paper sx={{p:1, mb:1, bgcolor:"secondary.main", color:"white", borderRadius:100, width:100, height:100, display:"flex", justifyContent:"center", alignItems:"center", mx:"auto"}}>
              M
            </Paper>
            <Typography sx={{fontWeight:'bold', fontSize:15, textAlign:"center"}}>
              Mendiola, Rob Justin A.
            </Typography>
            <Typography sx={{color:"violet", fontSize:15, textAlign:"center"}}>
              Leader
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{p:2, width:260, height:220, display:"flex", flexDirection:"column", alignItems:"center"}}>
          <CardContent>
            <Paper sx={{p:1, mb:1, bgcolor:"secondary.main", color:"white", borderRadius:100, width:100, height:100, display:"flex", justifyContent:"center", alignItems:"center", mx:"auto"}}>
              T
            </Paper>
            <Typography sx={{fontWeight:'bold', fontSize:15, textAlign:"center"}}>
              Tena, Amelia Mignonette H.
            </Typography>
            <Typography sx={{color:"violet", fontSize:15, textAlign:"center"}}>
              Member
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{p:2, width:260, height:220, display:"flex", flexDirection:"column", alignItems:"center"}}>
          <CardContent>
            <Paper sx={{p:1, mb:1, bgcolor:"secondary.main", color:"white", borderRadius:100, width:100, height:100, display:"flex", justifyContent:"center", alignItems:"center", mx:"auto"}}>
              B
            </Paper>
            <Typography sx={{fontWeight:'bold', fontSize:15, textAlign:"center"}}>
              Beltran, Christian D.
            </Typography>
            <Typography sx={{color:"violet",fontSize:15, textAlign:"center"}}>
              Member
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{p:2, width:260, height:220, display:"flex", flexDirection:"column", alignItems:"center"}}>
          <CardContent>
            <Paper sx={{p:1, mb:1, bgcolor:"secondary.main", color:"white", borderRadius:100, width:100, height:100, display:"flex", justifyContent:"center", alignItems:"center", mx:"auto"}}>
              U
            </Paper>
            <Typography sx={{fontWeight:'bold',fontSize:15, textAlign:"center"}}>
              Panes, Clyde Lawrence  S.
            </Typography>
            <Typography sx={{color:"violet", fontSize:15, textAlign:"center"}}>
              Member
            </Typography>
          </CardContent>
        </Card>
        
        
      </Box>
      
    </Box>
  );
}