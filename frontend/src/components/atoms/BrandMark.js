import { Box } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

export default function BrandMark({ light = false }) {
  return <Box sx={{ width: 36, height: 36, borderRadius: '10px', display: 'grid', placeItems: 'center', bgcolor: light ? 'rgba(255,255,255,.13)' : 'primary.main', color: '#fff' }}><CameraAltOutlinedIcon fontSize="small" /></Box>;
}
