export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    planned: "blue",
    in_progress: "yellow",
    finished: "green",
    canceled: "red",
    completed: "green",
  };
  return statusMap[status] || "gray";
}

export function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    planned: "Запланировано",
    in_progress: "Идет",
    finished: "Завершено",
    canceled: "Отменено",
    completed: "Завершено",
  };
  return statusMap[status] || status;
}

export function getTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    accreditation: "Аккредитация",
    lesson: "Урок",
    exam: "Экзамен",
  };
  return typeMap[type] || type;
}
