import React from 'react';

const KanbanCard = ({ card }) => {
  return (
    <div
      style={{
        margin: '10px 0',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <h4 style={{ marginBottom: '5px', fontSize: '1rem' }}>{card.title}</h4>
      {card.tag && (
        <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '4px' }}>
          Tag: {card.tag}
        </p>
      )}
      {card.userId && (
        <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '4px' }}>
          Assigned to: <strong>{card.userId}</strong>
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <small
          style={{
            fontStyle: 'italic',
            color: '#999',
            fontSize: '0.75rem',
          }}
        >
          Priority: {card.priority}
        </small>
        <span
          style={{
            fontSize: '0.75rem',
            backgroundColor: '#e0e0e0',
            padding: '2px 6px',
            borderRadius: '4px',
          }}
        >
          {card.status}
        </span>
      </div>
    </div>
  );
};

export default KanbanCard;
