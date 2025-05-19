// routers/memberRoutes.ts
import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';
import { AppDataSource } from '../data-source';

const router = Router();
const controller = new MemberController(AppDataSource);

router.get('/', controller.getAllMembers);
router.get('/:id', controller.getMember);
router.post('/', controller.createMember);
router.put('/:id', controller.updateMember);
router.delete('/:id', controller.deleteMember);

export default router;