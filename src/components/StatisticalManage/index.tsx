import React from 'react';
import { Tab } from 'semantic-ui-react';
import StatisticalContainer from './StatisticalContainer';

export enum STATISTICAL_TYPE {
  MONTH = 'MONTH',
  QUATER = 'QUATER',
  YEAR = 'YEAR',
}

const panes = [
  {
    menuItem: 'Thống kê theo tháng',
    render: () => (
      <Tab.Pane>
        <StatisticalContainer type={STATISTICAL_TYPE.MONTH} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Thống kê theo Quý',
    render: () => (
      <Tab.Pane>
        <StatisticalContainer type={STATISTICAL_TYPE.QUATER} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Thống kê theo năm',
    render: () => (
      <Tab.Pane>
        <StatisticalContainer type={STATISTICAL_TYPE.YEAR} />
      </Tab.Pane>
    ),
  },
];

export default () => {
  return <Tab panes={panes} />;
};
