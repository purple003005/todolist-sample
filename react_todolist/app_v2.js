/**
 * Created by kay on 15/12/21.
 */
var Todo = React.createClass({
    displayName:'TODO',
    getInitialState:function(){
        return(
        {
            todos:[]
        }
        );
    },
    addTodoHandler:function(todo){
        var tmpTodos = this.state.todos
        tmpTodos.push(todo);
        this.setState({'todos':tmpTodos});
    },
    render:function(){
        return(
            <div>
                <h1>Todo</h1>
                <TodoInputField addTodoHandler={this.addTodoHandler}/>
                <TodoContent todos={this.state.todos} />
            </div>
        );
    }
});
var TodoContent = React.createClass({
    displayName:'TODO_CONTENT',
    getInitialState:function(){
        return(
        {
            'todos':this.props.todos
        }
        );
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({'todos':nextProps.todos});
    },
    render:function(){
        var todos = _.map(this.state.todos,function(todo,idx){
            return(
                <li key = {idx}>{todo}</li>
            );
        });
        return(
            <ul>
                {todos}
            </ul>
        );
    }
});
var TodoInputField = React.createClass({
    displayName:'TODO_INPUT_FILED',
    addTodo:function(e){
        if(e.keyCode == 13){
            var inputValue = ReactDOM.findDOMNode(this).value;
            var timestamp = ' @ ' + (new Date()).toLocaleString()
            this.props.addTodoHandler(inputValue + timestamp);
            ReactDOM.findDOMNode(this).value = '';
        }
    },
    render:function(){
        return(
            <input placeholder='Type Something' type="text" onKeyDown={this.addTodo}/>
        );

    }
});

ReactDOM.render(<Todo />,document.querySelector('#app'));