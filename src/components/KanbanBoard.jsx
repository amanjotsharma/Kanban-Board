import React, { useState, useEffect } from 'react';
import DisplayDropdown from './DisplayDropdown';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping by "status"
  const [ordering, setOrdering] = useState('priority'); // Default ordering by "priority"

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        // Map user names to tasks
        const updatedTasks = data.tickets.map((ticket) => {
          const user = data.users.find((u) => u.id === ticket.userId);
          return { ...ticket, userName: user?.name || 'Unassigned' };
        });

        setTasks(updatedTasks);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Group tasks based on selected grouping
  const groupTasks = (tasks, grouping) => {
    switch (grouping) {
      case 'status':
        return {
          todo: tasks.filter((task) => task.status === "Todo"),
          backlog: tasks.filter((task) => task.status === "Backlog"),
          "In Progress": tasks.filter((task) => task.status === "In progress"),
          done: tasks.filter((task) => task.status === 'done')
        };
      case 'user':
        const userGroups = {};
        tasks.forEach((task) => {
          const userName = task.userName || 'Unassigned';
          if (!userGroups[userName]) {
            userGroups[userName] = [];
          }
          userGroups[userName].push(task);
        });
        return userGroups;
      case 'priority':
        return {
          "No Priority": tasks.filter((task) => task.priority === 0),
          low: tasks.filter((task) => task.priority === 1),
          medium: tasks.filter((task) => task.priority === 2),
          high: tasks.filter((task) => task.priority === 3),
          urgent: tasks.filter((task) => task.priority === 4)
        };
      default:
        return {};
    }
  };

  // Sort tasks within groups based on selected ordering
  const sortTasks = (tasks, ordering) => {
    const sortedTasks = [...tasks]; // Create a copy to avoid mutating state
    if (ordering === 'priority') {
      return sortedTasks.sort((a, b) => a.priority - b.priority);
    } else if (ordering === 'title') {
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedTasks;
  };

  const groupedTasks = groupTasks(tasks, grouping);

  return (
    <div className="kanban-container">
      <DisplayDropdown
        onGroupingChange={(value) => setGrouping(value)}
        onOrderingChange={(value) => setOrdering(value)}
      />
      <div className="kanban-columns">
        {Object.keys(groupedTasks).map((groupKey) => (
          <KanbanColumn
            key={groupKey}
            title={groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
            cards={sortTasks(groupedTasks[groupKey], ordering)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
