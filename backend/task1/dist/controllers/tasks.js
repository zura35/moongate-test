"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    listTasks(cursor, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitNumber = parseInt(limit, 10);
            let res = this.taskService.listTasks(cursor, limitNumber);
            return {
                tasks: res.tasks,
                nextCursor: res.nextCursor,
            };
        });
    }
    getTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = this.taskService.getTask(id);
            if ('message' in res) {
                throw new Error(res.message);
            }
            return res;
        });
    }
    createTask(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = this.taskService.createTask(title, description);
            return res;
        });
    }
    updateTask(id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = this.taskService.updateTask(id, title, description);
            if ('message' in res) {
                throw new Error(res.message);
            }
            return res;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = this.taskService.deleteTask(id);
            if (res === undefined) {
                return;
            }
            throw new Error(res.message);
        });
    }
}
exports.default = TasksController;
