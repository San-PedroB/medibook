export function validateFields(fields) {
  return fields.every(value =>
    Array.isArray(value)
      ? value.length > 0
      : typeof value === "string" && value.trim() !== ""
  );
}
