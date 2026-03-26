import { z } from 'zod';
import { stakeholderSchema } from '../schemas/stakeholder';

export type Stakeholder = z.infer<typeof stakeholderSchema>;
