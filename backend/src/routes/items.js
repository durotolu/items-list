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
const express_validator_1 = require("express-validator");
const db_1 = __importDefault(require("../config/db"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get all items
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield db_1.default.query('SELECT * FROM items ORDER BY created_at DESC');
        res.json(items.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}));
// Add a new item
router.post('/', auth_1.default, [
    (0, express_validator_1.body)('name').notEmpty().trim().escape(),
    (0, express_validator_1.body)('description').notEmpty().trim().escape()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { name, description } = req.body;
    const userId = req.user.id;
    try {
        const newItem = yield db_1.default.query('INSERT INTO items (name, description, user_id) VALUES ($1, $2, $3) RETURNING *', [name, description, userId]);
        res.json(newItem.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
