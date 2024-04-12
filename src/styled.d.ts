import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		mainHighlightColor: string;
		defaultBackgroundColor: string;
		textColor: string;
		accentColor: string;
	}
}
