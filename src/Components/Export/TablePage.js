import PropTypes from 'prop-types';
import React from 'react';
import { t_global_background_color_secondary_default } from '@patternfly/react-tokens';

export const TablePage = ({ clusters, styles }) => {
  const header = [
    { value: 'Name', style: { fontSize: 8, width: '200px' } },
    {
      value: 'Version',
      style: { fontSize: 8, textAlign: 'left', width: '80px' },
    },
    {
      value: 'Recommendations',
      style: { fontSize: 8, textAlign: 'left', width: '80px' },
    },
    {
      value: 'Critical',
      style: { fontSize: 8, textAlign: 'left', width: '60px' },
    },
    {
      value: 'Important',
      style: { fontSize: 8, textAlign: 'left', width: '60px' },
    },
    {
      value: 'Moderate',
      style: { fontSize: 8, textAlign: 'left', width: '60px' },
    },
    {
      value: 'Low',
      style: { fontSize: 8, textAlign: 'left', width: '60px' },
    },
    { value: 'Last Seen', style: { fontSize: 8, width: '120px' } },
  ];

  const headerBuilder = ({ value, style }) => (
    <th
      scope="col"
      className="pf-v6-c-table__th"
      style={{ ...style, ...styles.bold }}
    >
      {value}
    </th>
  );

  // PatternFly positions every table cell, and Chrome prints each positioned box as
  // its own layer. Body cells are unpositioned here, so a row prints as one piece.
  const cellStyle = { fontSize: 8, position: 'static' };

  const rowBuilder = ({ value }) => (
    <td
      className="pf-v6-c-table__td pf-m-no-padding"
      style={{ ...cellStyle, paddingTop: '1px', paddingBottom: '1px' }}
    >
      {value}
    </td>
  );

  const rows =
    clusters?.map((cluster, idx) => {
      const lastChecked = cluster.last_checked_at || cluster.last_seen;
      const [, date, month, year, time] = lastChecked
        ? new Date(lastChecked).toUTCString().split(' ')
        : ['', 'N/A', '', '', ''];
      const clusterDate = lastChecked
        ? `${date} ${month} ${year}, ${time.split(':').slice(0, 2).join(':')} UTC`
        : 'N/A';

      const isOddRow = (idx + 1) % 2;
      const customStyle = {
        backgroundColor: t_global_background_color_secondary_default.var,
      };

      const hitsByRisk = cluster.hits_by_total_risk || {};

      return (
        <tr
          key={cluster.cluster_id || cluster.cluster_name}
          className="pf-v6-c-table__tr"
          style={isOddRow ? customStyle : {}}
        >
          <td className="pf-v6-c-table__td pf-m-no-padding" style={cellStyle}>
            <a
              style={styles.link}
              href={`/openshift/insights/advisor/clusters/${cluster.cluster_id}`}
            >
              {cluster.cluster_name || cluster.display_name}
            </a>
          </td>
          {rowBuilder({ value: cluster.cluster_version || 'N/A' })}
          {rowBuilder({ value: cluster.total_hit_count || 0 })}
          {rowBuilder({ value: hitsByRisk['4'] || 0 })}
          {rowBuilder({ value: hitsByRisk['3'] || 0 })}
          {rowBuilder({ value: hitsByRisk['2'] || 0 })}
          {rowBuilder({ value: hitsByRisk['1'] || 0 })}
          <td className="pf-v6-c-table__td pf-m-no-padding" style={cellStyle}>
            {clusterDate}
          </td>
        </tr>
      );
    }) || [];

  // Plain elements with PatternFly's class names: a PDF is never interactive,
  // so it keeps the styling without the hooks PatternFly runs for every cell.
  return (
    <table
      aria-label={'export-table'}
      role="grid"
      className="pf-v6-c-table pf-m-grid-md pf-m-compact"
      data-ouia-component-type="PF6/Table"
      data-ouia-safe="true"
      data-ouia-component-id="export-table"
    >
      <thead className="pf-v6-c-table__thead">
        <tr className="pf-v6-c-table__tr">
          {header.map((colHeader, idx) =>
            headerBuilder({
              value: colHeader.value,
              style: colHeader.style,
              key: idx,
            }),
          )}
        </tr>
      </thead>
      <tbody role="rowgroup" className="pf-v6-c-table__tbody">
        {rows}
      </tbody>
    </table>
  );
};

TablePage.propTypes = {
  clusters: PropTypes.array,
  styles: PropTypes.object,
};

export default TablePage;
