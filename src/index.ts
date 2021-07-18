import express from 'express';
import cors from 'cors';
import { projectsRoutes } from './routes/projects.routes';
import { middlewareCount } from './middlewares/countMiddleware';

var count = 0
const app = express();


app.use(cors());
app.use(express.json());

app.use( (req, res, next) => {
 const countResult = middlewareCount({request: req, response: res, count: count})
 count = countResult
 next();
});

app.use("/projects",projectsRoutes)

export default app;
