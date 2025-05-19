// index.ts
import * as express from 'express';
import * as cors from 'cors';
import { AppDataSource } from './data-source';
import memberRoutes from './routers/memberRoutes';
import itemRoutes from './routers/itemRoutes';
import loanRoutes from './routers/loanRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Adatbázis csatlakozva');

    app.use('/members', memberRoutes);
    app.use('/items', itemRoutes);
    app.use('/loans', loanRoutes);

    app.listen(port, () => {
      console.log(`🚀 Szerver fut: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Adatbázis csatlakozási hiba:', err);
  });
