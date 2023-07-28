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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("../controllers/tasks"));
const tasks_2 = __importDefault(require("../services/tasks"));
const router = express_1.default.Router();
const taskController = new tasks_1.default(new tasks_2.default());
router.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield taskController.listTasks(req.query.cursor, req.query.limit);
    // return 200
    res.send(response);
}));
router.get("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield taskController.getTask(req.params.id);
        res.send(response);
    }
    catch (e) {
        if (e.message === "Task not found") {
            res.status(404).send();
            return;
        }
    }
}));
router.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield taskController.createTask(req.body.title, req.body.description);
    res.status(201).send(response);
}));
router.put("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield taskController.updateTask(req.params.id, req.body.title, req.body.description);
        res.send(response);
    }
    catch (e) {
        if (e.message === "Task not found") {
            res.status(404).send();
            return;
        }
    }
}));
router.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield taskController.deleteTask(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        if (e.message === "Task not found") {
            res.status(404).send();
            return;
        }
    }
}));
exports.default = router;
