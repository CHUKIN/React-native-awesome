import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Badge } from 'native-base';

export default class MainTab extends Component {
	constructor(props) {
		super(props);
		this.state = { count: 0 };
	}

	incrementButton = () => {
		this.setState(state => ({
			count: state.count + 1
		}));
	}

	decrementButton = () => {
		this.setState(state => ({
			count: state.count - 1
		}));
	}

	render() {
		return (
			<View style={styles.mainTab}>
				<Button light style={styles.leftButton} onPress={this.incrementButton}>
					<Text> УВЕЛИЧИТЬ </Text>
				</Button>
				<Badge style={{
					width: 100
				}} success={this.state.count > 0} primary={this.state.count === 0}>
					<Text>{this.state.count}</Text>
				</Badge>
				<Button light style={styles.rightButton} onPress={this.decrementButton}>
					<Text> УМЕНЬШИТЬ </Text>
				</Button>
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