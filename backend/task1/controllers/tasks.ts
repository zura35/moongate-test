interface Task {
    id: string;
    title: string;
    description: string;
}

interface ListTasksResponse {
    tasks: Task[];
    nextCursor: string;
}

abstract class TaskService {
    abstract listTasks(cursor: string, limit: number): ListTasksResponse;
    abstract getTask(id: string): Task | Error;
    abstract createTask(title: string, description: string): Task;
    abstract updateTask(id: string, title: string, description: string): Task | Error;
    abstract deleteTask(id: string): void | Error;
}

export default class TasksController {
    taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    public async listTasks(cursor: string, limit: string): Promise<ListTasksResponse> {
        const limitNumber = parseInt(limit, 10);
        let res = this.taskService.listTasks(cursor, limitNumber);
        return {
            tasks: res.tasks,
            nextCursor: res.nextCursor,
        };
    }

    public async getTask(id: string): Promise<Task> {
        let res = this.taskService.getTask(id);
        if ('message' in res) {
            throw new Error(res.message);
        }
        return res;
    }

    public async createTask(title: string, description: string): Promise<Task> {
        let res = this.taskService.createTask(title, description);
        return res;
    }

    public async updateTask(id: string, title: string, description: string): Promise<Task> {
        let res = this.taskService.updateTask(id, title, description);
        if ('message' in res) {
            throw new Error(res.message);
        }
        return res;
    }

    public async deleteTask(id: string): Promise<void> {
        let res = this.taskService.deleteTask(id);
        if (res === undefined) {
            return;
        }
        throw new Error((res as Error).message);
    }
}