import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/db';
import auth from '../middleware/auth';

const router = express.Router();

// Get all items
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    res.json(items.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single item
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    
    if (item.rows.length === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    
    res.json(item.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new item
router.post(
  '/',
  auth,
  [
    body('name').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape()
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, description } = req.body;
    const userId = (req as any).user.id;

    try {
      const newItem = await pool.query(
        'INSERT INTO items (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
        [name, description, userId]
      );
      res.json(newItem.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update an item
router.put(
  '/:id',
  auth,
  [
    body('name').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape()
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { name, description } = req.body;
    const userId = (req as any).user.id;

    try {
      // Check if item exists and belongs to user
      const item = await pool.query(
        'SELECT * FROM items WHERE id = $1 AND user_id = $2',
        [id, userId]
      );

      if (item.rows.length === 0) {
        res.status(404).json({ message: 'Item not found or unauthorized' });
        return;
      }

      const updatedItem = await pool.query(
        'UPDATE items SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
        [name, description, id, userId]
      );

      res.json(updatedItem.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete an item
router.delete('/:id', auth, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    // Check if item exists and belongs to user
    const item = await pool.query(
      'SELECT * FROM items WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (item.rows.length === 0) {
      res.status(404).json({ message: 'Item not found or unauthorized' });
      return;
    }

    await pool.query('DELETE FROM items WHERE id = $1 AND user_id = $2', [id, userId]);
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 