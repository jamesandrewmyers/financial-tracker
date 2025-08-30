"use client";
import { useState } from "react";

interface TodoListProps {
    title: string;
    initialTodos?: string[];
}

export default function TodoList({ title, initialTodos = [] }: TodoListProps) {
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState("");

    const addTodo = () => {
        let trimmed = newTodo.trim();
        if (trimmed) {
            setTodos([...todos, trimmed]);
            setNewTodo("");
        }
    };

    return (
    <div className="overflow-hidden mt-6 bg-base-100 border border-base-300 shadow card">
        <div className="flex items-center gap-4 p-4 border-b border-base-300">
            <h2>{title}</h2>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-grow p-2 border rounded"
                placeholder="New todo"
            />
            <button
                onClick={addTodo}
                className="btn btn-primary"
            >
                Add
            </button>
        </div>
            <ul>
                {todos.map((todo, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <li>
                            {todo}
                        </li>
                        <button 
                            className="btn btn-secondary btn-sm ml-4"
                            onClick={() => {
                                setTodos(todos.filter((_, i) => i !== index));
                            }}
                        > Delete</button>
                    </div>
                ))}
            </ul>

    </div>
    );
}