"use client";
import { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {

   if (!isOpen) return null;

  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
        onClick={onClose}
    >

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onAbort={onClose}>
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
    </div>
  );
}

export default Modal;