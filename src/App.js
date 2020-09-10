import React, { Component } from "react";
import "./styles.css";

export default class App extends Component {
  state = {
    todo: "",
    todoList: []
  };

  componentDidMount(){
    let items = localStorage.getItem("todos");
    if(items){
      items = JSON.parse(items);
      this.setState({todoList: items});
    }
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value
    });
  };

  addTodo = () => {
    this.setState((prevState) => ({
      todoList: [...prevState.todoList, prevState.todo],
      todo: ""
    }), () => this.persistTodoItem(this.state.todoList));
  };

  removeItem = (pos) => {
    let newTodo = this.state.todoList;
    newTodo.splice(pos - 1, 1);
    this.setState({
      todoList: newTodo
    }, this.persistTodoItem(newTodo));
  }

  persistTodoItem = (todoItems) => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }

  render() {
    const { todo, todoList } = this.state;
    let x = 0;
    return (
      <div>
        <input type="text" value={todo} onChange={this.handleChange} />
        <button onClick={this.addTodo}> Add </button>

        {todoList.map((todoItem) => (
          <div key={++x} onClick={this.removeItem.bind(this, x)}> {todoItem}</div>
        ))}
      </div>
    );
  }
}
