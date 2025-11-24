import React from 'react';
import { SkillSummary } from '../types';

interface SummarySectionProps {
  summaries: SkillSummary[];
  totalRealValue: number;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summaries,
  totalRealValue
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-slate-900 mb-4">Summary</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Skill
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Real
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Boost
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Adjusted
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {summaries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-sm text-slate-500 italic">
                  No skills to display.
                </td>
              </tr>
            )}
            {summaries.map((summary) => (
              <tr key={summary.name}>
                <td className="px-3 py-2 text-sm font-medium text-slate-900 break-words max-w-[120px]">
                  {summary.name}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500 text-right">
                  {summary.realValue.toFixed(1)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500 text-right">
                  {summary.boostValue > 0 ? `+${summary.boostValue}` : '-'}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900 font-semibold text-right">
                  {summary.adjustedValue.toFixed(1)}
                </td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold">
              <td className="px-3 py-3 whitespace-nowrap text-sm text-slate-900">
                Total Real
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-sm text-slate-900 text-right">
                {totalRealValue.toFixed(1)}
              </td>
              <td colSpan={2}></td>
            </tr>
            <tr className="bg-slate-50 font-bold border-t border-slate-200">
              <td className="px-3 py-3 whitespace-nowrap text-sm text-slate-700">
                Remaining (Cap 720)
              </td>
              <td className={`px-3 py-3 whitespace-nowrap text-sm text-right ${
                (720 - totalRealValue) < 0 ? 'text-red-600' : 'text-slate-700'
              }`}>
                {(720 - totalRealValue).toFixed(1)}
              </td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
