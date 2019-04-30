import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Badge, Form, Item, Input, Picker, Icon} from 'native-base';

export default class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskName: "",
            SelectedTaskType: null
        };
    }

    onValueChange(value) {
        this.setState({
            SelectedTaskType: value
        });
    }

    render() {
        var listOfPickerItems = this.props.TaskTypeList.map((element, index) => {
            return <Picker.Item label={element.Text} value={element.Id} key={index} />
        })
        return (
            <Form>
                <Item>
                    <Input placeholder="Название задачи"
                        onChangeText={(TaskName) => this.setState({ TaskName })}
                        value={this.state.TaskName}/>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Выберите тип задачи"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.SelectedTaskType}
                        onValueChange={this.onValueChange.bind(this)}>
                        {listOfPickerItems}
                    </Picker>
                </Item>
                <Button block onPress={() => this.props.createButton({
                    TaskName: this.state.TaskName,
                    TaskType: this.state.SelectedTaskType
                })}>
                    <Text>Добавить</Text>
                </Button>
            </Form>
        );
    }
}

const styles = StyleSheet.create({

});