import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Badge, Form, Item, Input, Picker, Icon} from 'native-base';

export default class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            selectedTaskTypeValue: 0
        };
        this.sendNewTask = this.sendNewTask.bind(this);
    }

    onValueChange(value) {
        this.setState({
            selectedTaskTypeValue: value
        });
    }

    sendNewTask() {
        this.props.createButton({
            taskName: this.state.taskName,
            taskTypeValue: this.state.selectedTaskTypeValue
        })
        this.setState({
            taskName: ""
        });
    }

    render() {
        var listOfPickerItems = this.props.taskTypeList.map((element, index) => {
            return <Picker.Item label={element.text} value={element.id} key={index} />
        })
        return (
            <Form>
                <Item>
                    <Input placeholder="Название задачи"
                        onChangeText={taskName => this.setState({ taskName })}
                        value={this.state.taskName}/>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Выберите тип задачи"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selectedTaskTypeValue}
                        onValueChange={this.onValueChange.bind(this)}>
                        {listOfPickerItems}
                    </Picker>
                </Item>
                <Button disabled={!this.state.taskName} block onPress={() => this.sendNewTask()}>
                    <Text>Добавить</Text>
                </Button>
            </Form>
        );
    }
}

const styles = StyleSheet.create({

});