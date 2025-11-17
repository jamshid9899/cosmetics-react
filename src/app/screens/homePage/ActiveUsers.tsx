import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>💎 Our Beauty Community</Box>
          <Box className="category-subtitle">
            Meet our most active and valued members
          </Box>
          
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member, index: number) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      key={member._id}
                      variant="outlined"
                      className={"card"}
                      sx={{ 
                        '--card-index': index,
                        position: 'relative',
                        overflow: 'visible',
                      }}
                    >
                      {/* Top Member Badge */}
                      <Box className="top-member-badge">
                        <VerifiedIcon sx={{ fontSize: 14, mr: 0.3 }} />
                        Top Member
                      </Box>

                      <CardOverflow variant="soft">
                        <AspectRatio ratio="1">
                          <img 
                            src={imagePath} 
                            alt={member.memberNick}
                            style={{
                              transition: 'transform 0.5s ease',
                            }}
                            className="user-avatar-img"
                          />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow
                        variant="soft"
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                          py: 2,
                          background: 'linear-gradient(180deg, #fff, #fdfbf7)',
                          borderTop: '2px solid #f5f5f5',
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <Typography
                            level="body-sm"
                            textAlign="center"
                            fontWeight="700"
                            fontSize="16px"
                            textColor={"#2c2c2c"}
                            fontFamily="'Poppins', sans-serif"
                          >
                            {member.memberNick}
                          </Typography>
                          
                          <Typography
                            level="body-sm"
                            textAlign="center"
                            fontWeight="500"
                            fontSize="13px"
                            textColor={"#b88a44"}
                            fontFamily="'Poppins', sans-serif"
                            sx={{
                              textTransform: 'capitalize',
                            }}
                          >
                            {member.memberType}
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className={"no-data"}>No active users</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}