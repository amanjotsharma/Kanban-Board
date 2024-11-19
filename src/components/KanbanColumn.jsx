import React from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, cards }) => {
  return (
    <div
      style={{
        flex: '1 1 300px',
        maxWidth: '300px',
        backgroundColor: '#f4f6fa',
        padding: '0px',
        borderRadius: '8px',
        // boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h2>
      {cards.map((card) => (
        <KanbanCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default KanbanColumn;
