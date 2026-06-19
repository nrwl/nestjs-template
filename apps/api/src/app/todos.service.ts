import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  CreateTodoDto,
  Todo,
  TodoListResponse,
  UpdateTodoDto,
} from '@nestjs-template/types';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Build something great with Nx',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Add remote caching with Nx Cloud',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ];

  private nextId = 3;

  findAll(): TodoListResponse {
    return { data: this.todos, total: this.todos.length };
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException(`Todo #${id} not found`);
    return todo;
  }

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: dto.title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    if (dto.title !== undefined) todo.title = dto.title;
    if (dto.completed !== undefined) todo.completed = dto.completed;
    return todo;
  }

  remove(id: number): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Todo #${id} not found`);
    this.todos.splice(index, 1);
  }
}
