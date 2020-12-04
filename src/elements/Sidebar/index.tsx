import { Obj } from 'interfaces/common';
import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import sidebarBg from '../../assets/bgsidebar.jpg';
import './styles.scss';

interface SidebarProps {
  menus: Obj[];
  activeTab?: string;
  title: string;

  onClickItem?(value: string): void;
}

export default (props: SidebarProps) => {
  const onClickMenuItem = (value: string) => {
    props.onClickItem && props.onClickItem(value);
  };
  return (
    <ProSidebar toggled={true} collapsed={false} breakPoint="md" image={sidebarBg}>
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {props.title}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          {props.menus.map((menuItem, index) => {
            return menuItem.isLeaf === true ? (
              <MenuItem key={index} active={menuItem.target === props.activeTab}>
                <div onClick={() => onClickMenuItem(menuItem.target as any)}>{menuItem.title}</div>
              </MenuItem>
            ) : (
              <SubMenu title={menuItem.title} key={index}>
                {menuItem.childrens &&
                  (menuItem.childrens as any).map((subItem: any, index: number) => {
                    return (
                      <MenuItem key={index}>
                        {subItem.title}
                        <Link to={`${menuItem.target}/${subItem.target}`} />
                      </MenuItem>
                    );
                  })}
              </SubMenu>
            );
          })}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          TMFOOD
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
