"use client";

import CellereLogo from "@/assets/CellereLogo";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full shadow-sm bg-white z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-2 text-gray-900">
                <div className="flex items-center w-full justify-between md:justify-start">
                    <div className="flex justify-center md:justify-start w-full md:w-auto">
                        <CellereLogo />
                    </div>
                </div>
            </div>
        </header>
    );
}
