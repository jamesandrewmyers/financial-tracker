"use client";

import React, { useState } from "react";
import {ReactNode} from "react";

interface TabBarProps {
    tabs: { title: string; node: ReactNode }[];
}

export default function TabBar({ tabs }: TabBarProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab tab-bordered ${activeTab === index ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {tabs[activeTab] && tabs[activeTab].node}
            </div>
        </div>
    );
}