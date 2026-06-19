// Shared DTOs and types used across the API

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoDto {
  title: string;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

export interface TodoListResponse {
  data: Todo[];
  total: number;
}
