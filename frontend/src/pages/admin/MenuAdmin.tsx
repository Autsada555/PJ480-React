import React from 'react';

const Hello: React.FC = () => {
    return (
        <div>
            <div className="bg-gray-300 w-full md:w-[250px] h-fit md:h-[800px] p-4 space-y-4">
                {Number(localStorage.getItem("id")) === 200 && (
                    <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
                        <a href="management" className="block text-center">จัดการเมนู</a>
                    </button>
                )}

                {[200, 201].includes(Number(localStorage.getItem("id"))) && (
                    <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
                        <a href="checkpayment" className="block text-center">เช็คการจ่ายเงิน</a>
                    </button>
                )}

                {[200].includes(Number(localStorage.getItem("id"))) && (
                    <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
                        <a href="listuser" className="block text-center">รายชื่อผู้ใช้งาน</a>
                    </button>
                )}

                {[200, 202].includes(Number(localStorage.getItem("id"))) && (
                    <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
                        <a href="delivery" className="block text-center">การจัดส่งสินค้า</a>
                    </button>
                )}

            </div>
        </div>
    );
};

export default Hello;

