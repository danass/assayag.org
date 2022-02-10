import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/Collection.js';



export const TaskRender = ({ task }) => {
  return <li>{task.text} </li>;
};

export const TaskList = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return (
    <div>
      <h1>Salam</h1>
      <ul>
        {tasks.map((task) => (
          <TaskRender key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};
