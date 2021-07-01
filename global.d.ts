type GenericRecord<Value = any> = Record<string, Value>;

interface Action {
  type: string;
  payload?: string | GenericRecord;
}

interface ReducerStateType {
  processing: boolean;
  processed: boolean;
  success: boolean;
  errors: GenericRecord;
  message?: string;
}

interface ManyObjectState<T = GenericRecord> extends ReducerStateType {
  data: T[];
  paginationMeta?: {
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalObjects: number;
    totalPages: number;
    maxObjectsPerPage: number;
  };
}

interface SingleObjectState<T = GenericRecord> extends ReducerStateType {
  data: T;
}

interface Payload {
  data?: GenericRecord | GenericRecord[];
  errors?: GenericRecord[];
  pagination?: PaginationType;
}

interface SingleObjectPayload<T = GenericRecord> extends Payload {
  data?: T;
}

type PageType = {
  path: string;
  component: React.FC<any>;
  exact: boolean;
  [key: string]: any;
};




