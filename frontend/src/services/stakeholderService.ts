import { stakeholderArraySchema } from '../schemas/stakeholder';
import { Stakeholder } from '../types/stakeholder';

const API_BASE_URL = 'http://localhost:5000/api';

export async function getStakeholders(): Promise<Stakeholder[]> {
  const response = await fetch(`${API_BASE_URL}/stakeholders`);

  if (!response.ok) {
    throw new Error('Failed to fetch stakeholders');
  }

  const data = await response.json();
  return stakeholderArraySchema.parse(data);
}
