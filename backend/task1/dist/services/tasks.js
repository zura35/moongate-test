"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class TaskService {
    constructor() {
        this.tasks = [];
    }
    listTasks(cursor, limit) {
        var _a, _b;
        if (!limit) {
            limit = 10;
        }
        if (!cursor) {
            cursor = ((_a = this.tasks[0]) === null || _a === void 0 ? void 0 : _a.id) || '';
        }
        const cursorIndex = this.tasks.findIndex(task => task.id === cursor);
        const tasks = this.tasks.slice(cursorIndex, cursorIndex + limit);
        return {
            tasks,
            nextCursor: ((_b = this.tasks[cursorIndex + limit]) === null || _b === void 0 ? void 0 : _b.id) || '',
        };
    }
    getTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            return new Error('Task not found');
        }
        return task;
    }
    createTask(title, description) {
        const task = {
            id: (0, crypto_1.randomUUID)(),
            title,
            description,
        };
        this.tasks.push(task);
        return task;
    }
    updateTask(id, title, description) {
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
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return new Error('Task not found');
        }
        this.tasks.splice(taskIndex, 1);
    }
}
exports.default = TaskService;
