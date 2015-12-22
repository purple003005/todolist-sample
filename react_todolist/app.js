var Add = React.createClass({
  getInitialState:function(){
    return (
        {todoList : []}
    );
  },
  addTodoState:function(list){
    var addList = this.state.todoList;
    addList.push(list);
    this.setState({'todoList': addList});
  },
  render: function() {
    return (
        <li>
          <InputEvent addTodos={this.addTodoState}/>
            <RenderList todolistState={this.state.todoList}/>
        </li>

    );
  }
});

var RenderList = React.createClass({
    getInitialState:function() {
        return (
            {'todoList': this.props.todolistState}
        );
    },
    componentWillReceiveProps:function(newProps){
        this.setState({'todoList':newProps.todolistState});
        //debugger;
    },
    /*
    handleEdit:function(e){
      console.log('handleEdit');
    },
    */
    render:function(){
        var tmplist = this.state.todoList.map(function(list,index){
            return(
                <li key={index}>
                    {list}
                    <button >
                        Edit
                    </button>
                    <button>
                        Remove
                    </button>
                </li>
            )
        })
        return(
            <ul>
                {tmplist}
            </ul>
        )
    }

})
/*
var Editlist = React.createClass({

})
*/
var InputEvent = React.createClass({
  KeyEnter:function(e){
    if(e.keyCode==13){
      console.log(ReactDOM.findDOMNode(this).value);
      this.props.addTodos(ReactDOM.findDOMNode(this).value);
        ReactDOM.findDOMNode(this).value = '';
    }
  },
  render:function(){
    return(
        <input placeholder='Type Something...' type="text" onKeyDown={this.KeyEnter}/>
    )
  }
})

ReactDOM.render(<Add />,document.getElementById('addTxt'));
