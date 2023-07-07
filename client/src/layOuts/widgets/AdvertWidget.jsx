import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/Flexbetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () =>  {
  const {palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='100%'
        alt="advert"
        src="http://localhost:4444/avatar.png"
        style={{borderRadius:'.75rem', margin:'.75rem 0'}}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>MikaCosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m='.5rem 0'>
        Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget;;