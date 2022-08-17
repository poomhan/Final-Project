import Typography from "@mui/material/Typography";

const SayHi = ({ name = '' }) => {
  return (
    <Typography component='span' sx={{display: 'flex', gap: 0.5, paddingBottom: 3, paddingTop: 3, color: '#414141'}} fontSize='xx-large'>
      Hi, <Typography component='span' fontSize='xx-large' fontWeight='bold'>{name}</Typography> 👋🏼
    </Typography>
  );
};

export default SayHi;
