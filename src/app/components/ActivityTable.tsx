import React from 'react';

interface Activity {
  id: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
}

interface ActivityTableProps {
  activities: Activity[];
}

export const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Type</th>
          <th className="border p-2">Montant</th>
          <th className="border p-2">Solde</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <td className="border p-2">{activity.date}</td>
            <td className="border p-2">{activity.description}</td>
            <td className="border p-2">{activity.type}</td>
            <td className="border p-2">{activity.amount}</td>
            <td className="border p-2">{activity.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
