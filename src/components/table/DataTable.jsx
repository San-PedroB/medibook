import React from "react";
import { Table, Button } from "react-bootstrap";

export default function DataTable({
  data,
  columns,
  globalFilter = "",
  onStartEdit,
  onDelete,
  rowKey = "id",
}) {
  // Filtrado global
  const filtered = globalFilter
    ? data.filter((row) =>
        columns.some((col) => {
          // Permite filtrar por el valor mostrado, incluyendo custom cell
          if (col.cell && typeof col.cell === "function") {
            try {
              const rendered = col.cell({ value: row[col.accessor], row: { original: row } });
              const val = (typeof rendered === "string" ? rendered : String(rendered)).toLowerCase();
              return val.includes(globalFilter.toLowerCase());
            } catch {
              return false;
            }
          }
          const val = String(row[col.accessor] ?? "").toLowerCase();
          return val.includes(globalFilter.toLowerCase());
        })
      )
    : data;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.accessor || col.header)}>{col.header}</th>
          ))}
          {(onStartEdit || onDelete) && <th style={{ width: 180 }}>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {filtered.map((row) => {
          const id = String(row[rowKey]);
          return (
            <tr key={id}>
              {columns.map((col) => {
                // Custom cell
                if (col.cell) {
                  return (
                    <td key={String(col.accessor || col.header)}>
                      {col.cell({ value: row[col.accessor], row: { original: row } })}
                    </td>
                  );
                }
                // Valor normal
                const cellValue = row[col.accessor];
                return (
                  <td key={String(col.accessor || col.header)}>
                    {typeof cellValue === "object" && cellValue !== null
                      ? JSON.stringify(cellValue)
                      : cellValue ?? "-"}
                  </td>
                );
              })}
              {(onStartEdit || onDelete) && (
                <td>
                  <div className="d-flex gap-2">
                    {onStartEdit && (
                      <Button size="sm" onClick={() => onStartEdit(row)}>
                        Editar
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => onDelete(row)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          );
        })}

        {filtered.length === 0 && (
          <tr>
            <td colSpan={columns.length + (onStartEdit || onDelete ? 1 : 0)} className="text-center py-3">
              No hay registros que coincidan.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
