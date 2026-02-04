import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Search, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useTheme } from '../context/ThemeContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '../utils/cn';

// --- Ícones Customizados por Cor ---
const createIcon = (color: 'blue' | 'red' | 'green' | 'gold' | 'cyan') => {
    // Usando CDN confiável para ícones coloridos do Leaflet
    // Mapeamento de cores para arquivos disponíveis no repositório
    const colorMap = {
        blue: 'blue',
        red: 'red',
        green: 'green',
        gold: 'gold',
        cyan: 'violet' // Usando violeta como substituto visual próximo ou blue se preferir, mas vamos usar uma URL direta diferente se necessário.
        // Nota: O repositório padrão tem blue, gold, red, green, orange, yellow, violet, grey, black.
    };

    // Se for 'cyan', vamos usar o 'blue' padrão do leaflet ou 'violet' para diferenciar. 
    // Para ficar perfeito com seu design, vou usar o 'blue' padrão para regiões e cores fortes para rota.

    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colorMap[color] || 'blue'}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

const icons = {
    region: createIcon('blue'),   // Regiões (Azul/Padrão)
    origin: createIcon('green'),  // Origem (Verde)
    dest: createIcon('red')       // Destino (Vermelho)
};

// Pontos fixos (Regiões)
const regions = [
    { name: 'Barra da Tijuca', coords: [-23.0037, -43.3646] as [number, number], description: 'Sede Administrativa.' },
    { name: 'Zona Sul', coords: [-22.9711, -43.1882] as [number, number], description: 'Ponto Estratégico.' },
    { name: 'Centro / GIG', coords: [-22.8099, -43.2505] as [number, number], description: 'Hub Executivo.' },
];

// Componente para ajustar zoom
function MapUpdater({ center, zoom, bounds }: any) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (center) {
            map.flyTo(center, zoom || map.getZoom(), { duration: 1.5 });
        }
    }, [center, zoom, bounds, map]);
    return null;
}

// Interfaces
interface Suggestion {
    display_name: string;
    lat: string;
    lon: string;
}

export function CoverageMap() {
    const { theme } = useTheme();
    const { setRoute } = useBooking();
    // Map State
    const [center, setCenter] = useState<[number, number]>([-22.9068, -43.1729]);
    const [zoom, setZoom] = useState(11);
    const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | null>(null);
    const [isFixedRoutesOpen, setIsFixedRoutesOpen] = useState(false);

    // Route State
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
    const [distanceKm, setDistanceKm] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);

    // Inputs State
    const [originQuery, setOriginQuery] = useState('');
    const [destQuery, setDestQuery] = useState('');

    // Autocomplete State
    const [originSuggestions, setOriginSuggestions] = useState<Suggestion[]>([]);
    const [destSuggestions, setDestSuggestions] = useState<Suggestion[]>([]);
    const [activeInput, setActiveInput] = useState<'origin' | 'dest' | null>(null);

    // Coordenadas selecionadas (final)
    const [originCoords, setOriginCoords] = useState<{ lat: number, lon: number } | null>(null);
    const [destCoords, setDestCoords] = useState<{ lat: number, lon: number } | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- Debounce para Autocomplete ---
    useEffect(() => {
        const timer = setTimeout(() => {
            if (activeInput === 'origin' && originQuery.length > 3) fetchSuggestions(originQuery, setOriginSuggestions);
            if (activeInput === 'dest' && destQuery.length > 3) fetchSuggestions(destQuery, setDestSuggestions);
        }, 500); // Debounce de 500ms
        return () => clearTimeout(timer);
    }, [originQuery, destQuery, activeInput]);

    async function fetchSuggestions(query: string, setSuggestions: (s: Suggestion[]) => void) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&viewbox=-44.0,-22.7,-43.0,-23.1&bounded=1&limit=5`,
                { headers: { 'User-Agent': 'BlindaTrustApp/1.0' } }
            );
            const data = await response.json();
            setSuggestions(data || []);
        } catch (e) {
            console.error(e);
        }
    }

    function handleSelectSuggestion(type: 'origin' | 'dest', item: Suggestion) {
        if (type === 'origin') {
            setOriginQuery(item.display_name.split(',')[0]);
            setOriginCoords({ lat: parseFloat(item.lat), lon: parseFloat(item.lon) });
            setOriginSuggestions([]);
            setCenter([parseFloat(item.lat), parseFloat(item.lon)]);
            setZoom(14);
        } else {
            setDestQuery(item.display_name.split(',')[0]);
            setDestCoords({ lat: parseFloat(item.lat), lon: parseFloat(item.lon) });
            setDestSuggestions([]);
        }
        setActiveInput(null);
    }

    // --- Cálculo de Rota (OSRM) ---
    async function calculateRoute() {
        if (!originCoords || !destCoords) {
            setError('Por favor, selecione os endereços da lista de sugestões.');
            return;
        }

        setLoading(true);
        setError(null);
        setRouteCoords([]);
        setMapBounds(null);

        try {
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=full&geometries=geojson`;

            const response = await fetch(osrmUrl);
            const json = await response.json();

            if (json.code !== 'Ok' || !json.routes || json.routes.length === 0) {
                setError('Rota não encontrada.');
                setLoading(false);
                return;
            }

            const route = json.routes[0];
            const distMeters = route.distance;
            const coordsLeaflet = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);

            const km = distMeters / 1000;
            setDistanceKm(km);
            const calculatedPrice = km * 10;
            setPrice(calculatedPrice);
            setRouteCoords(coordsLeaflet);
            setRoute(originQuery, destQuery, calculatedPrice.toFixed(2));

            setMapBounds([
                [originCoords.lat, originCoords.lon],
                [destCoords.lat, destCoords.lon]
            ]);

        } catch (err) {
            setError('Erro ao calcular rota.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const fixedRoutes = [
        { name: "Aeroporto Galeão (GIG)", coords: [-22.8123, -43.2505] as [number, number], price: 500 },
        { name: "Aeroporto Santos Dumont (SDU)", coords: [-22.9101, -43.1631] as [number, number], price: 500 }
    ];

    function handleSelectFixedRoute(route: any) {
        setCenter(route.coords);
        setZoom(15);
        setDestQuery(route.name);
        setDestCoords({ lat: route.coords[0], lon: route.coords[1] });
        setRoute("Sua Localização", route.name, route.price);
        setIsFixedRoutesOpen(false);
    }

    return (
        <section id="vip" className={cn(
            "py-12 md:py-24 px-6 relative overflow-hidden z-30 transition-colors duration-500",
            theme === 'dark' ? "bg-black" : "bg-white"
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-accent mb-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <MapPin size={16} />
                        </div>
                        <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em]">Área de Cobertura</span>
                    </motion.div>
                    <motion.h3 className={cn(
                        "text-base font-medium mb-2 transition-colors duration-500",
                        theme === 'dark' ? "text-white" : "text-zinc-900"
                    )}>
                        Atendemos todo o Rio de Janeiro
                    </motion.h3>
                    <div className="h-0.5 w-12 bg-accent/50 mb-8" />
                </div>

                <div className={cn(
                    "relative w-full h-[600px] md:aspect-video md:h-auto rounded-[2.5rem] overflow-hidden border shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500",
                    theme === 'dark' ? "border-white/10 bg-[#0a0a0a]" : "border-black/5 bg-zinc-100"
                )}>
                    <MapContainer
                        center={[-22.9068, -43.1729]}
                        zoom={11}
                        style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                            url={theme === 'dark'
                                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            }
                        />
                        <MapUpdater center={center} zoom={zoom} bounds={mapBounds} />

                        {routeCoords.length > 0 && (
                            <Polyline positions={routeCoords} pathOptions={{ color: '#00ffff', weight: 4, opacity: 0.8 }} />
                        )}

                        {/* Marcadores Fixos (Azuis/Padrão) */}
                        {regions.map((region: { name: string, coords: [number, number], description: string }, idx: number) => (
                            <Marker key={idx} position={region.coords} icon={icons.region}>
                                <Popup className="glass-popup">
                                    <strong>{region.name}</strong><br />{region.description}
                                </Popup>
                            </Marker>
                        ))}

                        {/* Marcadores de Origem (Verde) e Destino (Vermelho) */}
                        {originCoords && <Marker position={[originCoords.lat, originCoords.lon]} icon={icons.origin} />}
                        {destCoords && <Marker position={[destCoords.lat, destCoords.lon]} icon={icons.dest} />}
                    </MapContainer>

                    {/* Interface Flutuante */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4 md:p-8 flex flex-col md:flex-row gap-4 items-start z-[1000]">

                        {/* Box Simular Trajeto */}
                        <div className={cn(
                            "pointer-events-auto w-full md:w-[360px] p-5 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-500",
                            theme === 'dark' ? "glass-dark border-white/10 bg-black/60" : "bg-white/90 border-black/5"
                        )}>
                            <div className="flex flex-col gap-4 relative">
                                <div className={cn(
                                    "text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2 transition-colors duration-500",
                                    theme === 'dark' ? "text-white" : "text-zinc-900"
                                )}>
                                    <Navigation size={14} className="text-accent" /> Simular Trajeto
                                </div>

                                {/* Input Origem */}
                                <div className="relative">
                                    <div className="absolute left-3 top-3 text-gray-500"><Search size={14} /></div>
                                    <input
                                        type="text"
                                        value={originQuery}
                                        onChange={(e) => setOriginQuery(e.target.value)}
                                        onFocus={() => setActiveInput('origin')}
                                        placeholder="Origem (ex: Copacabana Palace)"
                                        className={cn(
                                            "w-full rounded-lg border pl-9 pr-4 py-2.5 text-sm outline-none focus:border-accent/50 transition-all duration-500",
                                            theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-zinc-900"
                                        )}
                                    />
                                    <AnimatePresence>
                                        {activeInput === 'origin' && originSuggestions.length > 0 && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                className="absolute top-full left-0 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl max-h-[200px] overflow-y-auto"
                                            >
                                                {originSuggestions.map((item: Suggestion, i: number) => (
                                                    <li
                                                        key={i}
                                                        onClick={() => handleSelectSuggestion('origin', item)}
                                                        className={cn(
                                                            "px-4 py-3 text-xs cursor-pointer border-b last:border-0 transition-colors duration-500",
                                                            theme === 'dark' ? "text-gray-300 hover:bg-white/10 border-white/5" : "text-zinc-600 hover:bg-black/5 border-black/5"
                                                        )}
                                                    >
                                                        {item.display_name}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Input Destino */}
                                <div className="relative">
                                    <div className="absolute left-3 top-3 text-gray-500"><MapPin size={14} /></div>
                                    <input
                                        type="text"
                                        value={destQuery}
                                        onChange={(e) => setDestQuery(e.target.value)}
                                        onFocus={() => setActiveInput('dest')}
                                        placeholder="Destino (ex: Maracanã)"
                                        className={cn(
                                            "w-full rounded-lg border pl-9 pr-4 py-2.5 text-sm outline-none focus:border-accent/50 transition-all duration-500",
                                            theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-zinc-900"
                                        )}
                                    />
                                    <AnimatePresence>
                                        {activeInput === 'dest' && destSuggestions.length > 0 && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                className="absolute top-full left-0 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl max-h-[200px] overflow-y-auto"
                                            >
                                                {destSuggestions.map((item: Suggestion, i: number) => (
                                                    <li
                                                        key={i}
                                                        onClick={() => handleSelectSuggestion('dest', item)}
                                                        className={cn(
                                                            "px-4 py-3 text-xs cursor-pointer border-b last:border-0 transition-colors duration-500",
                                                            theme === 'dark' ? "text-gray-300 hover:bg-white/10 border-white/5" : "text-zinc-600 hover:bg-black/5 border-black/5"
                                                        )}
                                                    >
                                                        {item.display_name}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    onClick={calculateRoute}
                                    disabled={loading}
                                    className="mt-2 w-full rounded-lg bg-accent hover:bg-accent/80 text-black font-bold text-sm px-4 py-3 uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Calculando...</>
                                    ) : (
                                        'Calcular Preço'
                                    )}
                                </button>

                                {error && (
                                    <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                        {error}
                                    </div>
                                )}

                                <AnimatePresence>
                                    {distanceKm !== null && price !== null && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                            className={cn(
                                                "mt-2 p-4 rounded-xl border transition-all duration-500",
                                                theme === 'dark' ? "bg-white/5 border-accent/20" : "bg-black/5 border-accent/20"
                                            )}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-400 text-xs uppercase tracking-wider">Distância</span>
                                                <span className={cn(
                                                    "text-sm font-bold transition-colors duration-500",
                                                    theme === 'dark' ? "text-white" : "text-zinc-900"
                                                )}>{distanceKm?.toFixed(2)} km</span>
                                            </div>
                                            <div className="h-[1px] w-full bg-white/5 my-2" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400 text-xs uppercase tracking-wider">Estimativa</span>
                                                <span className="text-accent text-xl font-black">R$ {price?.toFixed(2)}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Modal Trajetos Fechados */}
                        <div className={cn(
                            "pointer-events-auto transition-all duration-500 relative",
                            isFixedRoutesOpen ? "w-full md:w-[300px]" : "w-auto"
                        )}>
                            <div
                                onClick={() => setIsFixedRoutesOpen(!isFixedRoutesOpen)}
                                className={cn(
                                    "p-4 rounded-2xl border backdrop-blur-md shadow-2xl cursor-pointer hover:border-accent/40 transition-all duration-500 w-full md:w-auto",
                                    theme === 'dark' ? "glass-dark border-white/10 bg-black/60" : "bg-white/90 border-black/5"
                                )}
                            >
                                <div className="flex items-center justify-between md:justify-start gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="text-accent">
                                            <Navigation size={15} />
                                        </div>
                                        <span className={cn(
                                            "text-xs font-black uppercase tracking-widest transition-colors duration-500 whitespace-nowrap",
                                            theme === 'dark' ? "text-white" : "text-zinc-900"
                                        )}>Trajetos Fechados</span>
                                    </div>
                                    <ChevronRight size={16} className={cn("text-gray-500 transition-transform", isFixedRoutesOpen && "rotate-90")} />
                                </div>
                            </div>

                            <AnimatePresence>
                                {isFixedRoutesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: 10, height: 0 }}
                                        className={cn(
                                            "mt-2 p-4 rounded-2xl border shadow-2xl overflow-hidden transition-all duration-500 w-full",
                                            theme === 'dark' ? "glass-dark border-white/10 bg-black/60 backdrop-blur-md" : "bg-white border-black/5"
                                        )}
                                    >
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4">Selecione um destino</p>
                                        <div className="space-y-3">
                                            {fixedRoutes.map((route, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => handleSelectFixedRoute(route)}
                                                    className="group cursor-pointer p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all"
                                                >
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className={cn(
                                                            "text-xs font-bold leading-tight group-hover:text-accent transition-colors duration-500",
                                                            theme === 'dark' ? "text-white" : "text-zinc-900"
                                                        )}>
                                                            {route.name}
                                                        </span>
                                                        <span className="text-accent text-[10px] font-black">R$ {route.price}</span>
                                                    </div>
                                                    <p className="text-[9px] text-gray-500">Tarifa fixa promocional</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-white/5">
                                            <p className="text-[9px] text-gray-400 italic leading-relaxed">
                                                *Valores válidos para qualquer ponto de partida dentro da cidade do Rio de Janeiro.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
