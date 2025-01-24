import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
    allowedRoles: number[]; // ระบุ role ที่อนุญาตให้เข้าถึง
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
    const roleID = Number(localStorage.getItem("id")); // ดึง roleID จาก localStorage

    // ตรวจสอบว่า roleID ตรงกับ role ที่อนุญาตหรือไม่
    if (!allowedRoles.includes(roleID)) {
        return <Navigate to="/home" replace />; // หากไม่ได้รับสิทธิ์ ให้กลับไปหน้า Login
    }

    return children;
};

export default PrivateRoute;
