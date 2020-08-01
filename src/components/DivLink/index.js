import styled from 'styled-components';

const DivLink = styled.div`
    padding: 20px 10px;
    a {
        color: var(--white);
        text-decoration: none;
        transition: color 0.5s;
      &:hover {
        color: var(--primary);
      }
    }
`;

export default DivLink;
