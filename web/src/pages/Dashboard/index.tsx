import React from 'react';

import { FaSignOutAlt, FaBell } from 'react-icons/fa';
import { useAuth } from '../../hooks/auth';

import {
  SiteWrap,
  SiteNav,
  Name,
  Note,
  Main,
  Header,
  ContentColumns,
  NavTabs,
  IconWrapper,
} from './styles';

function App() {
  const { signOut } = useAuth();

  return (
    <SiteWrap>
      <SiteNav>
        <Name>
          Pepper
          <IconWrapper>
            <FaBell />

            <FaSignOutAlt onClick={signOut} style={{ cursor: 'pointer' }} />
          </IconWrapper>
        </Name>

        <ul>
          <li className='active'>
            <a href='#'>Deals</a>
            <ul>
              <li>
                <a href='#0'>Create New Deal</a>
              </li>
              <li>
                <a href='#0'>Modify Deal</a>
              </li>
              <li>
                <a href='#0'>Pipeline</a>
              </li>
            </ul>
          </li>
          <li>
            <a href='#0'>Activities</a>
          </li>
          <li>
            <a href='#0'>Asset Libraries</a>
          </li>
          <li>
            <a href='#0'>Funds</a>
          </li>
          <li>
            <a href='#0'>Investors</a>
          </li>
          <li>
            <a href='#0'>Reports</a>
          </li>
        </ul>

        <Note>
          <h3>Your Monthly Report</h3>
          <p>
            Get the info about all your deals, pros, cons. And build your
            roadmap.
          </p>
        </Note>
      </SiteNav>

      <Main>
        <Header>
          <div className='breadcrumbs'>
            <a href='#0/'>Home</a>
          </div>

          <h1 className='title'>Pipeline</h1>

          <NavTabs>
            <a href='#0' className='active'>
              Deals
              <span>14</span>
            </a>
            <a href='#0'>
              Library
              <span>24</span>
            </a>
            <a href='#0'>Search Library</a>
          </NavTabs>
        </Header>

        <ContentColumns></ContentColumns>
      </Main>
    </SiteWrap>
  );
}

export default App;