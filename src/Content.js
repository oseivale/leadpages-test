import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";

export default function Content({ fetchedFormSubmissions }) {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <div variant="body1" sx={{ fontStyle: "italic", marginTop: 1 }}>
        {/* TODO: List of liked submissions here (delete this line) */}
        {fetchedFormSubmissions?.formSubmissions?.map((submission) => {
            const {
              data: { email, firstName, lastName },
              id,
            } = submission;

            return (
              <Card
                key={id}
                style={{ margin: "1rem", padding: ".5rem" }}
                variant="outlined"
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {firstName} {lastName}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {email}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </Box>
  );
}
