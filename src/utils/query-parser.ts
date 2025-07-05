interface RoutesQuery {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
}

export function parseRoutesQuery(q: Record<string, unknown>): RoutesQuery {
  const toDate = (v: unknown): Date | undefined => {
    const d = new Date(String(v));
    return Number.isNaN(d.getTime()) ? undefined : d;
  };

  const limit = q.limit ? parseInt(String(q.limit), 10) : undefined;
  return {
    limit:
      limit !== undefined && Number.isFinite(limit) && limit > 0
        ? limit
        : undefined,
    startDate: toDate(q.startDate),
    endDate: toDate(q.endDate),
  };
}
