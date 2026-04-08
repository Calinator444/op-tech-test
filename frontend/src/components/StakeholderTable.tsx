import { Stakeholder } from '../types/stakeholder';

interface Props {
  stakeholders: Stakeholder[];
}

export function StakeholderTable({ stakeholders }: Props) {
  if (stakeholders.length === 0) {
    return <p className="empty-message">No stakeholders found.</p>;
  }

  return (
    <table className="stakeholder-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Organisation</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {stakeholders.map((s) => (
          <tr key={s.id}>
            <td>{s.firstName}</td>
            <td>{s.lastName}</td>
            <td>{s.email}</td>
            <td>{s.organisation}</td>
            <td>{s.role}</td>
            <td>{s.title || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
