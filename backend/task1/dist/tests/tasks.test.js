"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../services/tasks"));
describe('listTasks', () => {
    const taskService = new tasks_1.default();
    // set up, create tasks
    let tasks = [];
    for (let i = 0; i < 10; i++) {
        tasks.push(taskService.createTask(`title${i}`, `description${i}`));
    }
    // test cases
    let testCases = [
        {
            name: 'no cursor, no limit',
            cursor: '',
            limit: NaN,
            expectedTaskIds: tasks.map(task => task.id),
            expectedNextCursor: '',
        },
        {
            name: 'cursor = first task id, limit = 1',
            cursor: tasks[0].id,
            limit: 1,
            expectedTaskIds: [tasks[0].id],
            expectedNextCursor: tasks[1].id,
        },
        {
            name: 'cursor = second task id, limit = 10',
            cursor: tasks[1].id,
            limit: 10,
            expectedTaskIds: tasks.slice(1).map(task => task.id),
            expectedNextCursor: '',
        },
    ];
    // run test cases
    for (let testCase of testCases) {
        test(testCase.name, () => {
            let res = taskService.listTasks(testCase.cursor, testCase.limit);
            expect(res.tasks.map(task => task.id)).toEqual(testCase.expectedTaskIds);
            expect(res.nextCursor).toEqual(testCase.expectedNextCursor);
        });
    }
});
describe('getTask', () => {
    const taskService = new tasks_1.default();
    // set up, create tasks
    let tasks = [];
    for (let i = 0; i < 10; i++) {
        tasks.push(taskService.createTask(`title${i}`, `description${i}`));
    }
    // test cases
    let testCases = [
        {
            name: 'task exists',
            id: tasks[5].id,
            expectedTask: tasks[5],
            expectedError: '',
        },
        {
            name: 'task not found',
            id: 'nonexistent',
            expectedTask: null,
            expectedError: 'Task not found',
        },
    ];
    // run test cases
    for (let testCase of testCases) {
        test(testCase.name, () => {
            let res = taskService.getTask(testCase.id);
            if (testCase.expectedError) {
                expect(res).toBeInstanceOf(Error);
                expect(res.message).toEqual(testCase.expectedError);
            }
            else {
                expect(res).toEqual(testCase.expectedTask);
            }
        });
    }
});
describe('createTask', () => {
    const taskService = new tasks_1.default();
    test('creates task with title and description', () => {
        let title = 'Some title';
        let description = 'Some description';
        let res = taskService.createTask(title, description);
        expect(res.title).toEqual(title);
        expect(res.description).toEqual(description);
    });
});
describe('updateTask', () => {
    const taskService = new tasks_1.default();
    // set up, create tasks
    let tasks = [];
    for (let i = 0; i < 10; i++) {
        tasks.push(taskService.createTask(`title${i}`, `description${i}`));
    }
    // test cases
    let testCases = [
        {
            name: 'task exists, update title',
            id: tasks[5].id,
            title: 'new title',
            description: '',
            expectedTask: {
                id: tasks[5].id,
                title: 'new title',
                description: tasks[5].description,
            },
            expectedError: '',
        },
        {
            name: 'task exists, update description',
            id: tasks[6].id,
            title: '',
            description: 'new description',
            expectedTask: {
                id: tasks[6].id,
                title: tasks[6].title,
                description: 'new description',
            },
            expectedError: '',
        },
        {
            name: 'task exists, update title and description',
            id: tasks[7].id,
            title: 'new title',
            description: 'new description',
            expectedTask: {
                id: tasks[7].id,
                title: 'new title',
                description: 'new description',
            },
            expectedError: '',
        },
        {
            name: 'task not found',
            id: 'nonexistent',
            title: 'new title',
            description: 'new description',
            expectedTask: null,
            expectedError: 'Task not found',
        },
    ];
    // run test cases
    for (let testCase of testCases) {
        test(testCase.name, () => {
            let res = taskService.updateTask(testCase.id, testCase.title, testCase.description);
            if (testCase.expectedError) {
                expect(res).toBeInstanceOf(Error);
                expect(res.message).toEqual(testCase.expectedError);
            }
            else {
                expect(res).toEqual(testCase.expectedTask);
            }
        });
    }
});
describe('deleteTask', () => {
    const taskService = new tasks_1.default();
    // set up, create tasks
    let tasks = [];
    for (let i = 0; i < 10; i++) {
        tasks.push(taskService.createTask(`title${i}`, `description${i}`));
    }
    test('task exists', () => {
        let res = taskService.deleteTask(tasks[5].id);
        expect(res).not.toBeInstanceOf(Error);
    });
    test('task not found', () => {
        let res = taskService.deleteTask('nonexistent');
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toEqual('Task not found');
    });
});
