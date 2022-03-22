import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OverviewTitle = styled.div`
  text-align: center;
  font-weight: 500;
  padding-bottom: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceData>(['tickers', coinId], {
    refetchInterval: 10000,
  });
  console.log(data);
  const price = data?.quotes.USD;
  return isLoading ? (
    <Loader>Loading Price...</Loader>
  ) : (
    <>
      <Overview>
        <OverviewTitle>Price Fluctuations</OverviewTitle>
        <Box>
          <OverviewItem>
            <span>12 HOURS</span>
            <span>{price?.percent_change_12h}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>1 DAY</span>
            <span>{price?.percent_change_24h}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>1 WEEK</span>
            <span>{price?.percent_change_7d}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>1 MONTH</span>
            <span>{price?.percent_change_30d}%</span>
          </OverviewItem>
        </Box>
      </Overview>
      <Overview>
        <OverviewTitle>HIGHEST</OverviewTitle>
        <Box>
          <OverviewItem>
            <span>PRICE</span>
            <span>${price?.ath_price.toLocaleString()}</span>
          </OverviewItem>
          <OverviewItem>
            <span>DATE</span>
            <span>{price?.ath_date.slice(0, 10)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>FROM HIGHEST</span>
            <span>{price?.percent_from_price_ath}%</span>
          </OverviewItem>
        </Box>
      </Overview>
    </>
  );
}

export default Price;
