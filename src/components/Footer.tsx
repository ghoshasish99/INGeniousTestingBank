import React from "react";
import { Container, Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <Container maxWidth="xl" style={{ marginTop: 50 }}>
      <Typography variant="body2" color="textSecondary" align="center">
        <i>
          This is a dummy website built by INGenious Team inspired by Cypress Real World Application
        </i>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 10 }}>
        Username : Heath93 / Password : s3cret
      </Typography>
    </Container>
  );
}
