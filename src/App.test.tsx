import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('To-Do App', () => {
    it('очищает завершенные задачи при нажатии на кнопку "Clear completed"', async () => {
        render(<App />);

        // Находим элементы
        const input = screen.getByPlaceholderText('Enter a new task');
        const addButton = screen.getByText('Add task');

        // Добавляем задачи
        await userEvent.type(input, 'Task 1');
        fireEvent.click(addButton);
        await userEvent.type(input, 'Task 2');
        fireEvent.click(addButton);

        // Завершаем первую задачу
        const toggleButton = screen.getAllByText('Not completed')[0];
        fireEvent.click(toggleButton);

        // Ждем появления кнопки "Clear completed" после завершения задачи
        const clearButton = await screen.findByRole('button', { name: /clear completed/i });

        // Убираем завершенные задачи
        fireEvent.click(clearButton);

        // Проверяем, что завершенная задача была удалена
        await waitFor(() => {
            expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        });

        // Проверяем, что незавершенная задача все еще в списке
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
});
