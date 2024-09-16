import styled from 'styled-components';

export const SiteWrap = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100vh;
`;

export const SiteNav = styled.nav`
  background: #0b121b;
  color: white;
  border-top-left-radius: 2rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
  height: 100vh;

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    margin-bottom: auto;

    li {
      list-style: none;
      a {
        display: block;
        padding: 0.75rem 0.5rem 0.75rem 2rem;
        position: relative;
        &:hover,
        &:focus {
          color: #4371c5;
        }
      }

      &.active > a {
        background: linear-gradient(to right, #101b2d, transparent);
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #4676cd;
          width: 5px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }

      ul {
        padding-left: 1rem;
        margin-bottom: 0.5rem;

        a {
          padding-top: 0.4rem;
          padding-bottom: 0.4rem;
        }
      }
    }
  }
`;

export const Name = styled.div`
  font-size: 1.3rem;
  position: relative;
  margin: 2rem 0;
  padding: 0 2.5rem 0.5rem 2rem;
  width: calc(100% - 3rem);
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 7px;
  right: 0;
  display: flex;
  gap: 10px;

  svg {
    fill: white;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const Note = styled.div`
  background: #171c26;
  border-radius: 10px;
  padding: 1rem;
  margin: 2rem;
  color: white;

  h3 {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }

  p {
    color: #717783;
  }
`;

export const Main = styled.main`
  background: #ebecee;
  border-top-left-radius: 2rem;
  padding: 3rem;
`;

export const Header = styled.header`
  .title {
    font-size: 1.5rem;
    color: #333;
  }
  .breadcrumbs a {
    color: #4371c5;
    text-decoration: none;
  }
`;

export const ContentColumns = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Col = styled.div`
  background: #ebecee;
  min-height: 500px;
  width: 200px;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
`;

export const Item = styled.div`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  min-height: 50px;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

export const NavTabs = styled.nav`
  a {
    margin-right: 2rem;
    display: inline-block;
    padding: 1rem 0;
    font-size: 1.15rem;
    color: #8c939e;
    position: relative;

    &.active {
      color: #101620;
      font-weight: 600;

      span {
        background: #d9dfea;
        color: #5887d1;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #457ace;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    }

    span {
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.25rem 0.4rem;
      font-weight: 600;
      background: #dfe0e2;
      color: #868d99;
    }
  }
`;
