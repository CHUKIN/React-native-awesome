import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';
import CreateNew from './components/CreateNew';
import ListItemToDo from './components/ListItemToDo';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            FamilyListToDo: {
                ShoppingList: [],
                ToDoList: [],
                TaskTypeList: []
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

    callCommandCompleteTask(item) {
        this.downloadListToDo();
    }

    callCommandCreateTask(item) {
        this.downloadListToDo();
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
                'https://facebook.github.io/react-native/movies.json',
                //'https://catalog.onliner.by/wallmount?install_location%5B0%5D=tabletop&install_location%5Boperation%5D=union&order=price:asc',
            );
            let responseJson = await response.json();

            const temporaryData = {
                ShoppingList: [{ Text: "Купить мясо", Id :1 }],
                ToDoList: [{ Text: "Поменять лампочку", Id: 0 }],
                TaskTypeList: [{ Text: "Покупка", Id: 0 }, { Text: "Задача", Id: 1 }]
            };

            this.setState(state => ({
                FamilyListToDo: temporaryData,
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
                                <ListItemToDo toDoList={this.state.FamilyListToDo.ShoppingList} completedButton={this.completedTask} />
                            </Tab>
                            <Tab heading="Задачи">
                                {/* <ToDoList toDoList={this.state.FamilyListToDo.ToDoList} /> */}
                                <ListItemToDo toDoList={this.state.FamilyListToDo.ToDoList} completedButton={this.completedTask} />
                            </Tab>
                            <Tab heading="Добавить">
                                <CreateNew TaskTypeList={this.state.FamilyListToDo.TaskTypeList} createButton={this.callCommandCreateTask} />
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
