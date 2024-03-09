"use client"

import React, { useState } from 'react';
import { Button } from "./ui/button";
import RiveMainEntry from "./RiveMainEntry";

interface MainComponentProps {
    localData: any;
}

export const MainComponent = ({
    localData
}: MainComponentProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(prevState => !prevState);
    };

    return (
        <div>
            <Button variant={'outline'} onClick={togglePopup}>
                Create
            </Button>
            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <RiveMainEntry localData={localData} />
                </div>
            )}
        </div>
    );
};
