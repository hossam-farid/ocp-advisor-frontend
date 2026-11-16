import PropTypes from 'prop-types';
import React from 'react';
import { Flex, FlexItem } from '@patternfly/react-core';
import {
  t_color_red_50,
  t_global_background_color_primary_default,
} from '@patternfly/react-tokens';

const RecommendationCharts = ({ columnHeader, header, rows }) => {
  return (
    <React.Fragment>
      <span style={{ color: t_color_red_50.value }}>{header}</span>
      <Flex spaceItems={{ default: 'spaceItemsLg' }}>
        <FlexItem style={{ width: '60%' }}>
          {/* Plain elements with PatternFly's class names: a PDF is never interactive,
              so it keeps the styling without the hooks PatternFly runs for every cell. */}
          <table
            aria-label={'recommendation-chart-table'}
            role="grid"
            className="pf-v6-c-table pf-m-grid-md pf-m-compact"
            data-ouia-component-type="PF6/Table"
            data-ouia-safe="true"
            data-ouia-component-id="recommendation-chart-table"
          >
            <thead className="pf-v6-c-table__thead">
              <tr className="pf-v6-c-table__tr">
                <th scope="col" className="pf-v6-c-table__th">
                  {columnHeader}
                </th>
                <th scope="col" className="pf-v6-c-table__th">
                  # of Recommendations
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="pf-v6-c-table__tbody">
              {rows?.map((item, index) => (
                <tr
                  key={`${columnHeader}-row-${index}`}
                  className="pf-v6-c-table__tr"
                  style={{
                    backgroundColor:
                      (index + 1) % 2 &&
                      t_global_background_color_primary_default.var,
                    fontSize: '12px',
                  }}
                >
                  <td
                    className="pf-v6-c-table__td"
                    style={{ fontSize: '12px' }}
                  >
                    {item[0]}
                  </td>
                  <td
                    className="pf-v6-c-table__td"
                    style={{ fontSize: '12px' }}
                  >
                    {item[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FlexItem>
      </Flex>
    </React.Fragment>
  );
};

RecommendationCharts.propTypes = {
  columnHeader: PropTypes.string,
  header: PropTypes.string,
  rows: PropTypes.array,
};

export default RecommendationCharts;
