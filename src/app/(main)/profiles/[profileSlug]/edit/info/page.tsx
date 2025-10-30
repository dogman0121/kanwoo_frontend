import { Toolbar, Typography } from "@mui/material";
import InfoForm from "./InfoForm";

export default async function Page() {
    return (
        <>
          <Typography 
              variant="h1"
              sx={{
                  p: "25px 25px 10px"
              }}
          >
              Основная информация
          </Typography>
          <InfoForm />  
        </>
    )
}