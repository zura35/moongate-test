import { randomUUID } from "crypto";

interface Task {
    id: string;
    title: string;
    description: string;
}

interface ListTasksResponse {
    tasks: Task[];
    nextCursor: string;
}

export default class TaskService {
    tasks: Task[] = [];

    public listTasks(cursor: string, limit: number): ListTasksResponse {
        if (!limit) {
            limit = 10;
        }

        if (!cursor) {
            cursor = this.tasks[0]?.id || '';
        }

        const cursorIndex = this.tasks.findIndex(task => task.id === cursor);
        const tasks = this.tasks.slice(cursorIndex, cursorIndex + limit);
        
        return {
            tasks,
            nextCursor: this.tasks[cursorIndex + limit]?.id || '',
        };
    }

    public getTask(id: string): Task | Error {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            return new Error('Task not found');
        }
        return task;
    }

    public createTask(title: string, description: string): Task {
        const task = {
            id: randomUUID(),
            title,
            description,
        };
        this.tasks.push(task);
        return task;
    }

    public updateTask(id: string, title: string, description: string): Task | Error {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            return new Error('Task not found');
        }
        if (title !== '') {
            task.title = title;
        }
        if (description !== '') {
            task.description = description;
        }
        return task;
    }

    public deleteTask(id: string): void | Error {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return new Error('Task not found');
        }
        this.tasks.splice(taskIndex, 1);
    }
}