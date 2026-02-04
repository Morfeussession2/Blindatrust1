import { createContext, useContext, useState, type ReactNode } from 'react';

interface BookingData {
    car: string;
    securityType: 'armada' | 'diaria' | null;
    origin: string;
    destination: string;
    price: string;
}

interface BookingContextType {
    bookingData: BookingData;
    setCar: (car: string) => void;
    setSecurityType: (type: 'armada' | 'diaria' | null) => void;
    setRoute: (origin: string, destination: string, price?: number | string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [bookingData, setBookingData] = useState<BookingData>({
        car: '',
        securityType: null,
        origin: '',
        destination: '',
        price: '',
    });

    const setCar = (car: string) => {
        setBookingData(prev => ({ ...prev, car }));
    };

    const setSecurityType = (type: 'armada' | 'diaria' | null) => {
        setBookingData(prev => ({ ...prev, securityType: type }));
    };

    const setRoute = (origin: string, destination: string, price?: number | string) => {
        setBookingData(prev => ({
            ...prev,
            origin,
            destination,
            price: price ? price.toString() : prev.price
        }));
    };

    return (
        <BookingContext.Provider value={{ bookingData, setCar, setSecurityType, setRoute }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
