import React, {useState, ChangeEvent} from 'react';
import Input from './components/Input';
import Button from './components/Button';
import "./App.css";

interface Task {
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, {text: newTask, completed: false}]);
            setNewTask('');
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };

    const toggleTaskCompletion = (index: number) => {
        setTasks(tasks.map((task, i) =>
            i === index ? {...task, completed: !task.completed} : task
        ));
    };

    const clearCompletedTasks = () => {
        setTasks(tasks.filter(task => !task.completed));
        setFilter('all');
    };

    const sortedTasks = tasks
        .sort((a, b) => Number(a.completed) - Number(b.completed))
        .filter((task) => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });

    return (
        <div
            className="bg-slate-100 max-w-[40rem] flex flex-col items-center mt-10 mx-4 sm:mx-auto border border-solid border-[#D1D5DB] p-2 rounded-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">To-Do List</h1>

            <div className="w-full flex items-center">
                <Input
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                    className={'mr-2 w-10 sm:w-auto'}
                />
                <Button onClick={addTask}>Add task</Button>
            </div>

            <ul className="w-full min-h-30">
                {sortedTasks.map((task, index) => (
                    <li
                        key={index}
                        className={`flex justify-between items-center p-4 my-2 rounded shadow ${task.completed ? 'bg-gray-300 line-through text-gray-500' : 'bg-white'}`}
                    >
                        <p className={'pr-2'}>{task.text}</p>
                        <Button onClick={() => toggleTaskCompletion(index)}>
                            {task.completed ? 'Сompleted' : 'Not completed'}
                        </Button>
                    </li>
                ))}
            </ul>

            {tasks.length > 0 && (
                <div className="w-full flex justify-between flex-col gap-2 md:flex-row mt-2">
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setFilter('all')}
                            className={filter === 'all' ? 'bg-slate-300' : ''}
                        >
                            All
                        </Button>
                        <Button
                            onClick={() => setFilter('active')}
                            className={filter === 'active' ? 'bg-slate-300' : ''}
                        >
                            Active
                        </Button>
                        <Button
                            onClick={() => setFilter('completed')}
                            className={filter === 'completed' ? 'bg-slate-300' : ''}
                        >
                            Completed
                        </Button>
                    </div>

                    <Button onClick={clearCompletedTasks}>Clear completed</Button>
                </div>
            )}
        </div>
    );
};

export default App;
