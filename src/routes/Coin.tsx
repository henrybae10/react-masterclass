import { Helmet } from "react-helmet";
import {
	Link,
	Outlet,
	useLocation,
	useMatch,
	useNavigate,
	useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinPrice, fetchDetailCoin } from "../apies/api";
import { useQuery } from "@tanstack/react-query";

const Container = styled.div`
	margin: 0 auto;
	max-width: 480px;
	padding: 0 20px;
`;

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
	background-color: black;
	color: ${(props) => props.theme.mainHighlightColor};
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
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
const Description = styled.p`
	margin: 20px 0px;
`;

interface LocationState {
	state: {
		name: string;
		rank: number;
	};
}

interface DetailCoinData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	logo: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

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

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: black;
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.isActive ? props.theme.mainHighlightColor : "white"};
	a {
		display: block;

		&:hover {
			color: ${(props) => props.theme.mainHighlightColor};
			font-size: 14px;
			font-weight: bold;
		}
	}
`;

const HomeButtonSection = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	margin-bottom: 10px;
	margin-right: 10px;
`;

const HomeButton = styled.svg`
	cursor: pointer;
`;

interface ICoinProps {}

function Coin({}: ICoinProps) {
	const { coinId } = useParams();
	const { state } = useLocation() as LocationState;
	const nav = useNavigate();

	const priceMatch = useMatch("/react-master/:coinId/price");
	const chartMatch = useMatch("/react-master/:coinId/chart");

	const { isLoading: detailLoading, data: detailCoin } =
		useQuery<DetailCoinData>({
			queryKey: ["detail", coinId ? coinId : ""],
			queryFn: () => fetchDetailCoin(coinId!),
		});

	const { isLoading: priceLoading, data: coinPrice } =
		useQuery<CoinPriceData>({
			queryKey: ["price", coinId ? coinId : ""],
			queryFn: () => fetchCoinPrice(coinId!),
		});

	const loading = detailLoading || priceLoading;

	const onClickToHome = () => {
		nav("/react-master");
	};

	return (
		<Container>
			<Helmet>
				<title>{coinId}</title>
			</Helmet>
			<Header>
				{state?.name
					? state.name
					: loading
					? "Loading..."
					: detailCoin?.name}
			</Header>
			<HomeButtonSection>
				<HomeButton
					onClick={onClickToHome}
					fill="#4ed0f9"
					width="30"
					height="30"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512">
					<path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
				</HomeButton>
			</HomeButtonSection>
			{loading || loading ? (
				<Loader>"Loading..."</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{detailCoin?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${detailCoin?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>
								{coinPrice?.quotes.USD.price.toFixed(2)}
							</span>
						</OverviewItem>
					</Overview>
					<Description>{detailCoin?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{coinPrice?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{coinPrice?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/react-master/${coinId}/chart`}>
								chart
							</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/react-master/${coinId}/price`}>
								price
							</Link>
						</Tab>
					</Tabs>
					<Outlet context={{ coinId: coinId }} />
				</>
			)}
		</Container>
	);
}

export default Coin;
