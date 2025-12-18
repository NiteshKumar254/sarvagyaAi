// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { clerkMiddleware, requireAuth } from '@clerk/express';
// import aiRouter from './routes/aiRouter.js';
// import connectCloudinary from './configs/cloudinary.js';
// import userRouter from './routes/userRouter.js';

// const app = express()

// await connectCloudinary()
 
// app.use(cors())
// app.use(express.json())
// app.use(clerkMiddleware())

// app.get('/', (req, res)=>res.send('Server is Live!'))

// app.use(requireAuth())

// app.use('/api/ai', aiRouter)
// app.use('/api/user', userRouter)

// const PORT = process.env.PORT || 3000;
 

// app.listen(PORT, ()=>{
//     console.log('Server is running on port', PORT);
// })

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRouter.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRouter.js';

const app = express();

try {
  await connectCloudinary();
  console.log('Cloudinary connected');
} catch (error) {
  console.error('Cloudinary connection failed', error);
}

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sarvagya-ai-lac.vercel.app/'
  ],
  credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send('Server is Live!');
});

app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
