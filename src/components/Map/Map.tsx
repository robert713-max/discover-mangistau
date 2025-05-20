import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
    Button,
    Box,
    Stack,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import L, { Icon } from 'leaflet';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './Map.scss';

const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const activeIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const monuments = [
  { name: 'Бекет ата жерасты мешіті және Ескі Бейнеу қорымы', position: [45.184440, 55.108610] }, //
  { name: 'Бекет ата жерасты мешіті (Оғланды)', position: [43.597220, 54.070000] }, //:contentReference[oaicite:1]{index=1}
  { name: 'Масат ата жерасты мешіті және қорымы', position: [43.693056, 52.881944] }, //
  { name: 'Қапаш мешіті', position: [44.253333, 52.343333] }, //:contentReference[oaicite:3]{index=3}
  { name: 'Ақүйік қорымы', position: [44.027131, 52.318722] }, //:contentReference[oaicite:4]{index=4}
  { name: 'Бекі қорымы', position: [43.886944, 52.062500] }, //:contentReference[oaicite:5]{index=5}
  { name: 'Қараман ата жерасты мешіті', position: [43.899722, 51.871944] }, //:contentReference[oaicite:6]{index=6}
  { name: 'Қараман ата қорымы', position: [43.899722, 51.871944] }, //:contentReference[oaicite:7]{index=7}
  { name: 'Сисем ата қорымы', position: [44.620933, 53.580583] }, //:contentReference[oaicite:8]{index=8}
  { name: 'Шопан ата жерасты мешіті', position: [43.547189, 53.393464] }, //:contentReference[oaicite:9]{index=9}
  { name: 'Шақпақ ата жерасты мешіті', position: [44.433969, 51.136133] }, //:contentReference[oaicite:10]{index=10}
  { name: 'Омар мен Тұр күмбезі', position: [45.272778, 55.437500] }, //:contentReference[oaicite:11]{index=11}
  { name: 'Сенек қорымы', position: [43.355933, 53.402253] }, //:contentReference[oaicite:12]{index=12}
  { name: 'Қызылсу қорымы', position: [43.566840, 53.457422] }, // (approximate, see:contentReference[oaicite:13]{index=13})
  { name: 'Қаратөбе қорымы', position: [44.763889, 52.268611] }, //:contentReference[oaicite:14]{index=14}
  { name: 'Бесінбай қорымы', position: [0.000000, 0.000000] }, // coordinates not found
  { name: 'Қамысбай қорымы', position: [44.092119, 52.120919] }, //:contentReference[oaicite:15]{index=15}
  { name: 'Уәли қорымы', position: [0.000000, 0.000000] }, // coordinates not found
  { name: 'Тарас Шевченко мұражайы мен мемориалдық кешені', position: [44.502925, 50.264725] }, //:contentReference[oaicite:16]{index=16}
  { name: 'Асалы күмбезтамы', position: [0.000000, 0.000000] } // coordinates not found
];

function MapController({ position }: { position: [number, number] }) {
    const map = useMap();
    map.flyTo(position, 16);
    return null;
}

function Map() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleClick = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.7;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box width="100%" height="100%">
            {/* Кнопки-карусель */}
            <Box px={2} display="flex" alignItems="center" justifyContent="center">
                {!isSmallScreen && (
                    <Button onClick={() => scroll('left')}>
                        <ChevronLeft />
                    </Button>
                )}
                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: isSmallScreen ? 'auto' : 'hidden',
                        scrollBehavior: 'smooth',
                        flexWrap: 'nowrap',
                        gap: 2,
                        py: 2,
                        width: '100%',
                    }}
                >
                    {monuments.map((monument, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <Button
                                key={index}
                                variant={isActive ? 'contained' : 'outlined'}
                                color={isActive ? 'primary' : 'inherit'}
                                onClick={() => handleClick(index)}
                                sx={{
                                    whiteSpace: 'normal',        // ✅ разрешаем перенос строк
                                    maxWidth: 200,               // ✅ ограничиваем ширину
                                    minWidth: 150,               // ✅ задаем минимальную ширину
                                    height: '200px',
                                    textAlign: 'center',         // ✅ выравниваем текст по центру
                                    color: isActive ? undefined : '#1976d2',
                                    borderColor: isActive ? undefined : '#1976d2',
                                    '&:hover': {
                                        borderColor: '#1565c0',
                                        backgroundColor: isActive ? undefined : 'rgba(21, 101, 192, 0.04)',
                                    },
                                }}
                            >
                                {monument.name}
                            </Button>
                        );
                    })}
                </Box>
                {!isSmallScreen && (
                    <Button onClick={() => scroll('right')}>
                        <ChevronRight />
                    </Button>
                )}
            </Box>

            {/* Карта */}
            <Box width="100%" height="600px">
                <MapContainer
                    center={[43.635588, 51.168245]}
                    zoom={8}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {monuments.map((monument: any, index) => (
                        <Marker
                            key={index}
                            position={monument.position}
                            icon={activeIndex === index ? activeIcon : defaultIcon}
                        >
                            <Popup>{monument.name}</Popup>
                        </Marker>
                    ))}
                    {activeIndex !== null && (
                        <MapController position={monuments[activeIndex].position as [number, number]} />
                    )}
                </MapContainer>
            </Box>
        </Box>
    );
}

export default Map;
