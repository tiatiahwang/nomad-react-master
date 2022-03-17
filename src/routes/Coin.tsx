import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.li`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouterState {
  state: {
    name: string;
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  // react-router-dom v6 이상이면 useParams 쓰는 순간 타입이 string or undefined로 정의됨
  const { coinId } = useParams();
  const { state } = useLocation() as RouterState;
  // const name = location.state as RouterState;

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading...'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
