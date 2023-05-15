export class CategorySearchValues {
  // @ts-ignore
  title: string = null;
}

export class PrioritySearchValues {
  // @ts-ignore
  title: string = null;
}

export class TaskSearchValues {

  // @ts-ignore
  title: string = null;
  // @ts-ignore
  completed: number | null = null;
  // @ts-ignore
  priorityId: number | null = null;
  // @ts-ignore
  categoryId: number | null = null;

  pageNumber = 0;
  pageSize = 5;

  sortColumn = 'title';
  sortDirection = 'asc';
}
