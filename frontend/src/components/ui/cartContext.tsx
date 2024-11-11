import { Menu } from "@/interfaces";
import { createContext, useState } from "react";

// export const cartContext = createContext({
//   menuID: [] as number[],
//   addToCart: (id: number) => {},
//   removeFromCart: (id: number) => {},
// });

// export const CartProvider = ({ children }: { children: any }) => {
//   const [cartCount, setCartCount] = useState<number>(0);
//   const [menuID, setMenuID] = useState<number[]>([]);

//   const addToCart = (id: number) => {
//     setCartCount((prevCount) => prevCount + 1);
//     setMenuID((prevMenuID) => [...prevMenuID, id]);
//   };

//   const removeFromCart = (id: number) => {
//     setMenuID((prevMenuID) => prevMenuID.filter((item) => item !== id));
//     setCartCount((prevCount) => prevCount - 1);
//   };

//   return (
//     <cartContext.Provider value={{ menuID, addToCart, removeFromCart, cartCount }}>
//       {children}
//     </cartContext.Provider>
//   );
// };
type CartType = {
  getMenus: () => Menu[];
  addMenu: (Menu: Menu) => void;
  removeMenu: (id: number) => void;
  getAmount: () => number;
  getTotal: () => number;
};
const CartContext = createContext<CartType>(null);

const CartProvider = ({ children }: { children: JSX.Element }) => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const getMenus = (): Menu[] => {
    return menu;
  };
  const addMenu = (menu: Menu) => {
    setMenu((prevMenuID) => [...prevMenuID, menu]);
  };
  const removeMenu = (index: number) => {
    setMenu(removeAt(menu, index));
  };
  const getAmount = () => {
    return menu.length;
  };
  const getTotal = () => {
    return parseFloat(
      menu.reduce((accumulator, menu) => accumulator + menu.Cost, 0).toFixed(2)
    );
  };
  return (
    <CartContext.Provider value={{ getMenus, addMenu, removeMenu, getAmount, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

const removeAt = (arr: Menu[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
};
export { CartProvider, CartContext };
