import { useEffect, useState } from 'react';
import { StakeholderTable } from '../components/StakeholderTable';
import { getStakeholders } from '../services/stakeholderService';
import { Stakeholder } from '../types/stakeholder';

export function StakeholdersPage() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStakeholders()
      .then(setStakeholders)
      .catch(() => setError('Failed to load stakeholders. Is the API running?'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Stakeholders</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <StakeholderTable stakeholders={stakeholders} />}
    </div>
  );
}
