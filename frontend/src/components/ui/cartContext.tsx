/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, MenuOrder } from "@/interfaces";
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
  getMenus: () => MenuOrder[];
  addMenu: (Menu: Menu) => void;
  removeMenu: (id: number) => void;
  getQuantity: () => number;
  getTotal: () => number;
  addQuantity: (menuId: number, amount: number) => void;
};
const CartContext = createContext<CartType>(null);

const CartProvider = ({ children }: { children: JSX.Element }) => {
  const [menuOrder, setMenuOrder] = useState<MenuOrder[]>([]);
  const getMenus = (): MenuOrder[] => {
    return menuOrder!;
  };
  const addMenu = (menu: Menu) => {
    setMenuOrder((prevMenuOrder) => {
      if (prevMenuOrder!.find((_menu) => _menu.Menu.ID === menu.ID)) {
        const menuIndex = prevMenuOrder.findIndex((_menu) => _menu.Menu.ID === menu.ID);
        const _menuOrder = prevMenuOrder;
        _menuOrder[menuIndex].Quantity += 1;
        return [..._menuOrder];
      } else {
        return [...prevMenuOrder, { Menu: menu, Quantity: 1, details: "123" }];
      }
    });
  };
  const removeMenu = (index: number) => {
    setMenuOrder(removeAt(menuOrder, index));
  };
  const getQuantity = () => {
    return menuOrder!.reduce((accumulator, menu) => accumulator + menu.Quantity, 0);
  };
  const getTotal = () => {
    return parseFloat(
      menuOrder!
        .reduce((accumulator, menu) => accumulator + menu.Menu.Cost * menu.Quantity, 0)
        .toFixed(2)
    );
  };
  function addQuantity(menuId: number, amount: number) {
    const _menuOrder = menuOrder;
    const menuIndex = menuOrder.findIndex((_menu) => _menu.Menu.ID === menuId);
    _menuOrder[menuIndex].Quantity += amount;
    if (_menuOrder[menuIndex].Quantity <= 1) {
      _menuOrder[menuIndex].Quantity = 1;
    }
    setMenuOrder([..._menuOrder]);
  }
  return (
    <CartContext.Provider
      value={{ getMenus, addMenu, removeMenu, getQuantity, addQuantity, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

const removeAt = (arr: MenuOrder[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
};

export { CartProvider, CartContext };
