import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StakeholderTable } from './StakeholderTable';
import { Stakeholder } from '../types/stakeholder';
import { MemoryRouter } from 'react-router-dom';


const mockStakeholders: Stakeholder[] = [
  {
    id: 1,
    title: "Mrs",
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    role: 'Investor',
    organisation: 'Venture Capital Partners',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 2,
    title: "Mr",
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
    render(
    
    <MemoryRouter>
    <StakeholderTable stakeholders={mockStakeholders} />
    </MemoryRouter>);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Johnson')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Williams')).toBeInTheDocument();
    expect(screen.getByText('Mr')).toBeInTheDocument();
    expect(screen.getByText('Mrs')).toBeInTheDocument();
  });

  it('renders the correct column headers', () => {
    render(
    <MemoryRouter>
    <StakeholderTable stakeholders={mockStakeholders} />
    </MemoryRouter>);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Organisation')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders a dash for empty title', () => {
    const stakeholdersWithEmptyTitle = [
      {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Smith',
        email: 'charlie.smith@example.com',
        role: 'Partner',
        organisation: 'Global Ventures',
        createdAt: '2024-03-10T00:00:00Z',
      },
    ];
    render(
    
    
    <MemoryRouter>
    <StakeholderTable stakeholders={stakeholdersWithEmptyTitle} />
    </MemoryRouter>);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('loads pagination from query params', ()=> {
    const stakeholders = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: 'Role',
      organisation: 'Organisation',
      createdAt: '2024-01-01T00:00:00Z',
    }));
    render(
    <MemoryRouter initialEntries={['/?page=2&pageSize=10']}>
      <StakeholderTable stakeholders={stakeholders} />
    </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: '2' })).toHaveClass('selected');
    expect(screen.getByRole('combobox')).toHaveValue('10');
  })

  it('hides pagination controls when there are no stakeholders', () => {
    render(
    
    <MemoryRouter>
      <StakeholderTable stakeholders={[]} />
    </MemoryRouter>);
    
    expect(screen.queryByText('Page Size:')).toBeNull();
  });

  it('render renders page count', () => {
    const manyStakeholders = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: 'Role',
      organisation: 'Organisation',
      createdAt: '2024-01-01T00:00:00Z',
    }));
    render(
    
    <MemoryRouter>
      <StakeholderTable stakeholders={manyStakeholders} />
    </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('displays a message when there are no stakeholders', () => {
    render(
    <MemoryRouter>
      <StakeholderTable stakeholders={[]} />
    </MemoryRouter>);

    expect(screen.getByText('No stakeholders found.')).toBeInTheDocument();
  });

  it('does not render a table when there are no stakeholders', () => {
    render(
    
    <MemoryRouter>
    <StakeholderTable stakeholders={[]} />
    </MemoryRouter>);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
