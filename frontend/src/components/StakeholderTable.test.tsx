import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StakeholderTable } from './StakeholderTable';
import { Stakeholder } from '../types/stakeholder';

const mockStakeholders: Stakeholder[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    role: 'Investor',
    organisation: 'Venture Capital Partners',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob@example.com',
    role: 'Advisor',
    organisation: 'TechCorp Ltd',
    createdAt: '2024-02-03T00:00:00Z',
  },
];

describe('StakeholderTable', () => {
  it('renders a row for each stakeholder', () => {
    render(<StakeholderTable stakeholders={mockStakeholders} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Johnson')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Williams')).toBeInTheDocument();
  });

  it('renders the correct column headers', () => {
    render(<StakeholderTable stakeholders={mockStakeholders} />);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Organisation')).toBeInTheDocument();
  });

  it('displays a message when there are no stakeholders', () => {
    render(<StakeholderTable stakeholders={[]} />);

    expect(screen.getByText('No stakeholders found.')).toBeInTheDocument();
  });

  it('does not render a table when there are no stakeholders', () => {
    render(<StakeholderTable stakeholders={[]} />);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
