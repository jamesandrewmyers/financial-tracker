"use client";

import { useState } from 'react';

interface CountProps {
    title: string;
    count?: number;
}

export default function Count({ title, count }: CountProps) {
    const [internalCount, setInternalCount] = useState(count);

    return (
        <div className="flex items-end gap-4 mb-8">
            <h2>{title}: {internalCount}</h2>
            <button 
                className="btn btn-primary btn-sm ml-4"
                onClick={() => setInternalCount((prev) => (prev ? Number(prev)+1 : 0))}>Increment</button>
        </div>
    );
}