import { useI18n } from "vue-i18n";

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
  const { t } = useI18n();
  const statusMap: Record<string, string> = {
    planned: t("statuses.planned"),
    in_progress: t("statuses.in_progress"),
    finished: t("statuses.finished"),
    canceled: t("statuses.canceled"),
    completed: t("statuses.completed"),
  };
  return statusMap[status] || status;
}

export function getTypeLabel(type: string): string {
  const { t } = useI18n();
  const typeMap: Record<string, string> = {
    accreditation: t("types.accreditation"),
    lesson: t("types.lesson"),
    exam: t("types.exam"),
  };
  return typeMap[type] || type;
}
