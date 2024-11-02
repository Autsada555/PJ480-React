import { createContext, useState } from 'react';

export const cartContext = createContext({
    menuID: [] as number[],
    addToCart: (id: number) => { },
    removeFromCart: (id: number) => { },
    cartCount: 0,
});

export const CartProvider = ({ children }: { children: any }) => {
    const [cartCount, setCartCount] = useState<number>(0);
    const [menuID, setMenuID] = useState<number[]>([]);

    const addToCart = (id: number) => {
        setCartCount((prevCount) => prevCount + 1);
        setMenuID((prevMenuID) => [...prevMenuID, id]);
    };

    const removeFromCart = (id: number) => {
        setMenuID((prevMenuID) => prevMenuID.filter((item) => item !== id));
        setCartCount((prevCount) => prevCount - 1);
    };

    return (
        <cartContext.Provider value={{ menuID, addToCart, removeFromCart, cartCount }}>
            {children}
        </cartContext.Provider>
    );
};
