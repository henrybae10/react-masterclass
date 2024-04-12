import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../apies/api";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: ${(props) => props.theme.coinCardBackgroundColor};
	color: ${(props) => props.theme.textColor};
	border-radius: 15px;
	margin-bottom: 10px;
	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.mainHighlightColor};
		}
	}
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.mainHighlightColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

const DarkModeSection = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	margin-bottom: 20px;
`;

const DarkModeButton = styled.svg`
	cursor: pointer;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

interface IRouterProps {
	isDark: boolean;
	toggleDark: Function;
}

function Coins({ isDark, toggleDark }: IRouterProps) {
	const { isLoading, data } = useQuery<ICoin[]>({
		queryKey: ["allCoins"],
		queryFn: fetchCoins,
	});

	const onClickChangingMode = () => {
		toggleDark();
	};

	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
			</Header>
			<DarkModeSection>
				다크모드
				{isDark ? (
					<DarkModeButton
						onClick={onClickChangingMode}
						xmlns="http://www.w3.org/2000/svg"
						fill="#4ed0f9"
						width="50"
						height="30"
						viewBox="0 0 576 512">
						<path d="M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
					</DarkModeButton>
				) : (
					<DarkModeButton
						onClick={onClickChangingMode}
						xmlns="http://www.w3.org/2000/svg"
						fill="lightgrey"
						width="50"
						height="30"
						viewBox="0 0 576 512">
						<path d="M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H192c-70.7 0-128-57.3-128-128s57.3-128 128-128H384zM576 256c0-106-86-192-192-192H192C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
					</DarkModeButton>
				)}
			</DarkModeSection>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data &&
						data!.length > 0 &&
						data?.slice(0, 100).map((coin) => (
							<Coin key={coin.id}>
								<Link
									to={`/react-masterclass/${coin.id}`}
									state={coin}>
									<Img
										src={`https://static.coinpaprika.com/coin/${coin.id.toLowerCase()}/logo.png`}></Img>
									{coin.name} &rarr;
								</Link>
							</Coin>
						))}
				</CoinsList>
			)}
		</Container>
	);
}
export default Coins;
