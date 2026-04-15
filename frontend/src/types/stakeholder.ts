import { z } from 'zod';
import { stakeholderSchema, formStakeholder } from '../schemas/stakeholder';

export type Stakeholder = z.infer<typeof stakeholderSchema>;

export type FormStakeholder = z.infer<typeof formStakeholder>;