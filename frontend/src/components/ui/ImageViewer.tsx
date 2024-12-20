import React, { useState } from "react";

export function ImageViewer({ imageSrc }: { imageSrc: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* คลิกที่ภาพขนาดเล็กเพื่อเปิด Lightbox */}
            <img
                src={imageSrc}
                alt="ไม่มี"
                className=" rounded-md cursor-pointer"
                onClick={() => setIsOpen(true)}
            />

            {/* Lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src={imageSrc}
                        alt="ไม่มี"
                        className="max-w-full max-h-full rounded-md"
                    />
                </div>
            )}
        </>
    );
}
