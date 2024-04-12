import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinPrice } from "../apies/api";
import styled from "styled-components";

interface CoinPriceData {
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

function Price() {
	const { coinId } = useParams();

	const { isLoading, data: coinPrice } = useQuery<CoinPriceData>({
		queryKey: ["price", coinId ? coinId : ""],
		queryFn: () => fetchCoinPrice(coinId!),
	});

	return (
		<>
			{isLoading ? (
				"Loading..."
			) : (
				<CoinPriceTable>
					<CoinPriceTableTr>
						<CoinPriceTableTh>USD Price</CoinPriceTableTh>
						<CoinPriceTableTd>
							${coinPrice?.quotes.USD.price.toFixed(4)}
						</CoinPriceTableTd>
					</CoinPriceTableTr>
					<CoinPriceTableTr>
						<CoinPriceTableTh>Total Supply</CoinPriceTableTh>
						<CoinPriceTableTd>
							{coinPrice?.total_supply}
						</CoinPriceTableTd>
					</CoinPriceTableTr>
					<CoinPriceTableTr>
						<CoinPriceTableTh>
							percent from price ath
						</CoinPriceTableTh>
						<CoinPriceTableTd>
							{coinPrice?.quotes.USD.percent_from_price_ath}
						</CoinPriceTableTd>
					</CoinPriceTableTr>
				</CoinPriceTable>
			)}
		</>
	);
}

const CoinPriceTable = styled.table`
	margin: 50px 0;
	border-collapse: collapse;
	border-radius: 10px;
	border-style: hidden;
	box-shadow: 0 0 0 1px #000;
`;

const CoinPriceTableTr = styled.tr``;

const CoinPriceTableTh = styled.th`
	padding: 15px 0;
`;

const CoinPriceTableTd = styled.td`
	padding: 15px 0;
	text-align: center;
`;

export default Price;
