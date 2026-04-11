import { stakeholderArraySchema } from '../schemas/stakeholder';
import { Stakeholder } from '../types/stakeholder';
import { z } from 'zod';

const API_BASE_URL = 'http://localhost:5000/api';

export async function getStakeholders(): Promise<Stakeholder[]> {
  const response = await fetch(`${API_BASE_URL}/stakeholders`);

  if (!response.ok) {
    throw new Error('Failed to fetch stakeholders');
  }

  const data = await response.json();
  return stakeholderArraySchema.parse(data);
}

export async function getEmailExists(email: string): Promise<boolean> {
  const response = await fetch(
    `${API_BASE_URL}/stakeholders/email-exists?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) {
    throw new Error('Failed to check email existence');
  }

  const data = await response.json();

  return z.boolean().parse(data);
}

export async function createStakeholder(stakeholder: Omit<Stakeholder, 'id' | 'createdAt'>): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/stakeholders/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stakeholder),
  });

  if (!response.ok) {
    throw new Error('Failed to create stakeholder');
  }
}
