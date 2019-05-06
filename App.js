import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';
import CreateNew from './components/CreateNew';
import ListItemToDo from './components/ListItemToDo';
import queryString from 'query-string';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            familyListToDo: {
                shoppingList: [],
                toDoList: [],
                taskTypeList: []
            }
        };
        this.downloadListToDo = this.downloadListToDo.bind(this);
        this.completedTask = this.completedTask.bind(this);
        this.callCommandCompleteTask = this.callCommandCompleteTask.bind(this);
        this.callCommandCreateTask = this.callCommandCreateTask.bind(this);
    }

    componentDidMount() {
        this.downloadListToDo();
    }

    async callCommandCompleteTask(item) {
        let task = {
            id: item.id
        };
        try {
            let response = await fetch(
                'https://familylisttodo.azurewebsites.net/api/CompleteTask', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: queryString.stringify(task)
                }
            );
            this.simpleAlert("Выполнено")
        } catch (error) {
            this.simpleAlert("Ошибка")
        }
        this.downloadListToDo();
    }

    async callCommandCreateTask(item) {
        let newTask = {
            text: item.taskName,
            taskType: item.taskTypeValue
        };
        try {
            let response = await fetch(
                'https://familylisttodo.azurewebsites.net/api/CreateNewTask', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: queryString.stringify(newTask)
                }
            );
            this.simpleAlert("Добавлено")
        } catch (error) {
            this.simpleAlert("Ошибка")
        }
        this.downloadListToDo();
    }

    simpleAlert(message) {
        Alert.alert(
            'Подтверждение выполнения',
            message,
            [
                null,
                null,
                { text: 'Хорошо' },
            ],
            { cancelable: false },
        );
    }

    completedTask(item) {
        Alert.alert(
            'Подтверждение выполнения',
            'Задача выполнена?',
            [
                null,
                {
                    text: 'Нет',
                    style: 'cancel',
                },
                { text: 'Да', onPress: () => this.callCommandCompleteTask(item) },
            ],
            { cancelable: false },
        );
    }

    async downloadListToDo() {
        this.setState(state => ({
            inProgress: true
        }));

        try {
            let response = await fetch(
                'https://familylisttodo.azurewebsites.net/api/GetFamilyListToDo',
            );
            let familyListToDo = await response.json();

            this.setState(state => ({
                familyListToDo: familyListToDo,
                inProgress: false
            }));
        } catch (error) {
            this.setState(state => ({
                inProgress: false
            }));
        }
    }

    render() {
        let downloadButton;
        if (this.state.inProgress) {
            downloadButton   = <Spinner color = 'white'/>;
        } else {
            downloadButton = <Button transparent onPress={this.downloadListToDo}>
                <Icon name='refresh' />
            </Button>
        }
        return (
            <View style={styles.container}>
                <Container>
                    <Header hasTabs>
                        <Body>
                            <Title>Семейный список</Title>
                        </Body>
                        <Right>
                            {downloadButton}
                        </Right>
                    </Header>
                    <Content>
                        <Tabs>
                            <Tab heading="Покупки">
                                {/* <ShoppingList shoppingList={this.state.FamilyListToDo.ShoppingList} /> */}
                                <ListItemToDo toDoList={this.state.familyListToDo.shoppingList} completedButton={this.completedTask} />
                            </Tab>
                            <Tab heading="Задачи">
                                {/* <ToDoList toDoList={this.state.FamilyListToDo.ToDoList} /> */}
                                <ListItemToDo toDoList={this.state.familyListToDo.toDoList} completedButton={this.completedTask} />
                            </Tab>
                            <Tab heading="Добавить">
                                <CreateNew taskTypeList={this.state.familyListToDo.taskTypeList} createButton={this.callCommandCreateTask} />
                            </Tab>
                        </Tabs>
                    </Content>
                </Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
