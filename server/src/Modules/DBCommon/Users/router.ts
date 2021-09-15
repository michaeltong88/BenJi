import express, { request, Request, Response } from 'express';
import User from './UserSchema';

const router = express.Router();

router.get('/user', async (req: Request, res: Response) => {
    const { offset, limit } = req.query;
    const skipNumber = Number(offset) * Number(limit);
    let users = [];
    if (skipNumber > 0) {
        users = await User.find({}, null, {skip: skipNumber, limit: Number(limit)});
    } else {
        users = await User.find({});
    }
    const totalUserCount = await User.countDocuments();
    return res.status(200).send({
        users: users,
        hasMore: totalUserCount > ((Number(offset) + 1) * Number(limit))
    });
});

router.get('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = await User.findById(id);
    return res.status(200).send(userData);
});

router.post('/user', async (req: Request, res: Response) => {
    const { name, mode, age, activeSubscription } = req.body;
    const newUser = new User({ name, mode, age, activeSubscription });
    await newUser.save();
    return res.status(201).send(newUser);
});

router.put('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, mode, age, activeSubscription } = req.body;
    await User.findByIdAndUpdate(id, {
        name, mode, age, activeSubscription
    }, (result) => {
        return res.status(201).send('user updated');
    });
});

export { router as userRouter };