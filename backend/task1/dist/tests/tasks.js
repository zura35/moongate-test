"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../services/tasks"));
test("listTasks", () => {
    const taskService = new tasks_1.default();
    // set up, create tasks
    let tasks = [];
    for (let i = 0; i < 10; i++) {
        tasks.push(taskService.createTask(`title${i}`, `description${i}`));
    }
    // test cases
    let testCases = [
        {
            cursor: '',
            limit: NaN,
            expectedTaskIds: tasks.map(task => task.id),
            expectedNextCursor: '',
        },
        {
            cursor: tasks[0].id,
            limit: 1,
            expectedTaskIds: [tasks[1].id],
            expectedNextCursor: tasks[2].id,
        },
        {
            cursor: tasks[1].id,
            limit: 10,
            expectedTaskIds: tasks.slice(2).map(task => task.id),
            expectedNextCursor: '',
        },
    ];
    // run test cases
    for (let testCase of testCases) {
        let res = taskService.listTasks(testCase.cursor, testCase.limit);
        expect(res.tasks.map(task => task.id)).toEqual(testCase.expectedTaskIds);
        expect(res.nextCursor).toEqual(testCase.expectedNextCursor);
    }
});
