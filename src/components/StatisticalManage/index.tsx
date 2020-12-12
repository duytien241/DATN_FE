import React from 'react';
import { Breadcrumb, Header, Icon, Tab } from 'semantic-ui-react';
import { COMP_TYPE } from 'utils/common';
import StatisticalContainer from './StatisticalContainer';

export enum STATISTICAL_TYPE {
  MONTH = 'MONTH',
  QUATER = 'QUATER',
  YEAR = 'YEAR',
}

interface StatisticalManageProps {
  compType?: COMP_TYPE;
  id_user?: any;
}

export const StatisticalManage: React.FC<StatisticalManageProps> = (props: StatisticalManageProps) => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Section link>Quản lý</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          Thống kê
        </Breadcrumb.Section>
      </Breadcrumb>
      <Header>
        <Icon name="food" />
        Thống kê đơn hàng
      </Header>
      <Tab
        panes={[
          {
            menuItem: 'Thống kê theo tháng',
            render: () => (
              <Tab.Pane>
                <StatisticalContainer {...props} type={STATISTICAL_TYPE.MONTH} />
              </Tab.Pane>
            ),
          },
          {
            menuItem: 'Thống kê theo Quý',
            render: () => (
              <Tab.Pane>
                <StatisticalContainer {...props} type={STATISTICAL_TYPE.QUATER} />
              </Tab.Pane>
            ),
          },
          {
            menuItem: 'Thống kê theo năm',
            render: () => (
              <Tab.Pane>
                <StatisticalContainer {...props} type={STATISTICAL_TYPE.YEAR} />
              </Tab.Pane>
            ),
          },
        ]}
      />
    </>
  );
};
