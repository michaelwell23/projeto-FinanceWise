import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'; // Se estiver usando React Router
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
  const history = useHistory();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Você realmente deseja sair?');

    if (confirmLogout) {
      localStorage.removeItem('token');

      history.push('/signin');
    }
  };

  return (
    <SiteWrap>
      <SiteNav>
        <Name>
          Pepper
          <IconWrapper>
            <svg width='24' height='24' viewBox='0 0 24 24'>
              <path d='M11.5,22C11.64,22 11.77,22 11.9,21.96C12.55,21.82 13.09,21.38 13.34,20.78C13.44,20.54 13.5,20.27 13.5,20H9.5A2,2 0 0,0 11.5,22M18,10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18L18,16M19.97,10H21.97C21.82,6.79 20.24,3.97 17.85,2.15L16.42,3.58C18.46,5 19.82,7.35 19.97,10M6.58,3.58L5.15,2.15C2.76,3.97 1.18,6.79 1,10H3C3.18,7.35 4.54,5 6.58,3.58Z'></path>
            </svg>

            <FaSignOutAlt
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            />
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
