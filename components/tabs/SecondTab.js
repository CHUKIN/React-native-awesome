import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Badge, Spinner } from 'native-base';


export default class SecondTab extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: false, inProgress: false, movies: {} };
		this.downloadButton = this.downloadButton.bind(this);
	}

	async downloadButton() {
		this.setState(state => ({
			inProgress: true
		}));	

		try {
			let response = await fetch(
				//'https://facebook.github.io/react-native/movies.json',
				'https://catalog.onliner.by/wallmount?install_location%5B0%5D=tabletop&install_location%5Boperation%5D=union&order=price:asc',
			);
			let responseJson = await response.json();

			this.setState(state => ({
				movies: responseJson.movies,
				inProgress: false,
				isLoading: true
			}));
		} catch (error) {
			this.setState(state => ({
				inProgress: false,
				isLoading: false
			}));
		}
	}

	render() {
		const inProgress = this.state.inProgress;
		const isLoading = this.state.isLoading;
		let spinner;
		let text = "";

		if (inProgress) {
			spinner = <Spinner />;
			text = "Грузится";
		}
		return (
			<View style={styles.mainTab}>
				<Button light style={styles.leftButton} onPress={this.downloadButton}>
					<Text> Загрузить </Text>
				</Button>
				<Text> {text} </Text>
				{spinner}
					
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainTab: {
		flex: 1,
		flexDirection: 'row'
	},
	leftButton: {

	},
	rightButton: {
		position: 'absolute',
		right: 0
	}
});