import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ListView } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Badge, List, ListItem, Icon, CheckBox, Body } from 'native-base';

export default class ListItemToDo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let toDoListRender;
        if (this.props.toDoList) {
            toDoListRender = this.props.toDoList.map((element, index) => {
                return <ListItem key={index}>
                    <Body>
                        <Text>{element.text}</Text>
                    </Body>
                    <Icon name='checkmark' onPress={()=>this.props.completedButton(element)}/>
                </ListItem>
            })
        }
        return (
            <View>
                {toDoListRender}
            </View>
        );
    }
}

const styles = StyleSheet.create({

});