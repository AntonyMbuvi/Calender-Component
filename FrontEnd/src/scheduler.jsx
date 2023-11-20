import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './scheduler.css'

function Scheduler() {
    const [value, onChange] = useState(new Date());
    const [tasks, setTasks] = useState({});
    const entries = Object.entries(tasks);

    const handleChange = (newValue) => {
        onChange(newValue);
    };

    const addTask = () => {
        const task = prompt('Enter a task:');
        if (task) {
            const dateKey = value.toLocaleDateString('en-GB'); // 'en-GB' locale for 'dd/mm/yyyy' format
            const newTasks = { ...tasks };

            if (newTasks[dateKey]) {
                newTasks[dateKey].push(task);
            } else {
                newTasks[dateKey] = [task];
            }

            setTasks(newTasks);
        }
    };

    const renderTasksForDate = () => {
        const dateKey = value.toLocaleDateString('en-GB'); // 'en-GB' locale for 'dd/mm/yyyy' format
        const dateTasks = tasks[dateKey];

        if (dateTasks && dateTasks.length > 0) {
            return dateTasks.map((task, index) => <div key={index} className='singleTask'>{task}</div>);
        } else {
            return <div className='singleTask'>No tasks for this date</div>;
        }
    };

    const highlightDatesWithTasks = ({ date }) => {
        const dateKey = date.toLocaleDateString('en-GB'); // 'en-GB' locale for 'dd/mm/yyyy' format
        return tasks[dateKey] ? 'has-tasks' : '';
    };

    return (
        <div className='calenderPage'>
            <div className='allEntries'>
                {entries && entries.length > 0 ? entries.map((entry) => (
                    <div className='entry' key={entry[0]}>
                        <p className='entryP'><b><i>Task date is {entry[0]}</i></b></p>
                        <div className='singleEntries'>
                            {entry[1].map((task, index) => (
                                <p className='entryP' key={index}>{task}</p>
                            ))}
                        </div>
                    </div>
                ))
                : <h4>There are no tasks scheduled</h4>
                }
            </div>
            
            <div className="calendar-container">
                <Calendar onChange={handleChange} value={value} tileClassName={highlightDatesWithTasks} />
                
            </div>
            <div className="tasks-container">
                <h2>Tasks for {value.toLocaleDateString('en-GB')}</h2>
                <div className='allDateTasks'>
                    {renderTasksForDate()}
                </div>
                <button onClick={addTask} className='addTask'>Add Task</button>
            </div>
        </div>
    );
}

export default Scheduler;
