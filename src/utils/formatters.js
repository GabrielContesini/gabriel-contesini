const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const NUMBER_FORMATTER = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  return DATE_FORMATTER.format(new Date(value));
};

export const formatCompactNumber = (value) => {
  if (value === null || value === undefined) {
    return "0";
  }

  return NUMBER_FORMATTER.format(value);
};
