import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';


export const mainNavbarItems = [
    {
        id: 0,
        icon: <GpsFixedIcon/>,
        label: 'Wells',
        route: 'wells'
    },
    {
        id: 1,
        icon: <GpsNotFixedIcon/>,
        label: 'Reference Wells',
        route: 'reference-wells'
    },
    {
        id: 3,
        icon: <HorizontalSplitIcon/>,
        label: 'Well Tops',
        route: 'well-tops'
    },
]