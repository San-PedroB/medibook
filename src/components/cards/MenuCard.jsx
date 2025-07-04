// src/components/cards/MenuCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

export default function MenuCard({
  title,
  description,
  buttonText,
  onClick,
  icon,
  className = "",
  style = {}
}) {
  return (
    <Card
      className={`mb-4 shadow-sm h-100 menu-card ${className}`}
      style={style}
    >
      <Card.Body className="text-center d-flex flex-column justify-content-between">
        {icon && <div className="mb-3 icon-container">{icon}</div>}
        <Card.Title className="fs-4">{title}</Card.Title>
        <Card.Text className="text-muted fs-6">{description}</Card.Text>
        <Button variant="primary" size="lg" onClick={onClick}>
          {buttonText}
        </Button>
      </Card.Body>

      <style jsx>{`
        .menu-card {
          min-height: 320px;
          padding: 1.8rem;
          border-radius: 0.75rem;
        }

        .menu-card .card-body {
          padding: 2rem;
        }

        .menu-card .btn {
          width: 100%;
          font-size: 1.15rem;
          padding: 0.85rem;
        }

        .icon-container {
          font-size: 3rem;
          color: #0d6efd;
        }
      `}</style>
    </Card>
  );
}
