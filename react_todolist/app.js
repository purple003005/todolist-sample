var App = React.createClass({
    getInitialState: function(){
        //localStorage.clear();
        if (localStorage.getItem("todos") === null) {
            console.log("localhost= null");
            var defalt = [{val:'123',onEdit:false}];
            localStorage.setItem('todos',JSON.stringify(defalt));
        }
        var temp =JSON.parse(localStorage.getItem('todos'));
        console.log('getInitialState()');
        return {'todoList':temp};
    },
    add:function(e){
        e.preventDefault();
        var temp =JSON.parse(localStorage.getItem("todos"));
        var textNode = ReactDOM.findDOMNode(this.refs.add).value;
        if (textNode===''){
            this.setState({emptyInput:true});
        }else{
            var obj={val:textNode,onEdit:false}
            temp.push(obj);
            this.setState({'todoList':temp})
            ReactDOM.findDOMNode(this.refs.add).value='';
            this.setState({emptyInput:false});
            localStorage.setItem("todos",JSON.stringify(temp));
        }
    },

    edit: function(index) {
        var temp =JSON.parse(localStorage.getItem("todos"));
        var oldVal = temp[index].val;
        temp[index].onEdit = true;
        this.setState({'todoList':temp,'oldVal':oldVal});
        localStorage.setItem("todos",JSON.stringify(temp));
    },
    del: function(index) {
        var temp =JSON.parse(localStorage.getItem("todos"));
        temp.splice(index,1);
        this.setState({'todoList':temp});
        localStorage.setItem("todos",JSON.stringify(temp));
    },
    ok: function(index){
        var temp =JSON.parse(localStorage.getItem("todos"));
        temp[index].onEdit=false;
        this.setState({'todoList':temp});
        localStorage.setItem("todos",JSON.stringify(temp));

    },
    cancel: function(index){
        var temp =JSON.parse(localStorage.getItem("todos"));
        var old = this.state.oldVal;
        temp[index].onEdit = false;
        temp[index].val = old;
        this.setState({'todoList':temp});
        localStorage.setItem("todos",JSON.stringify(temp));
    },
    onChange: function(index,e)
    {
        var temp =JSON.parse(localStorage.getItem("todos"));
        var newVal = e.target.value;
        temp[index].val= newVal;
        this.setState({ 'todoList' : temp})
        localStorage.setItem("todos",JSON.stringify(temp));
        console.log('onChange()');
        //debugger;

    },
    componentWillMount: function() {
        //console.log('componnentWillMount()');

    },
    componentDidMount: function() {
        //console.log('componentDidMound');
    },
    render: function() {
        console.log('render');
        var _this = this;
        var empty = this.state.emptyInput;
        var inputCss='spanteam';
        if(empty) inputCss = 'empty'
        var tmp = this.state.todoList;
        var list = tmp.map(function(val, idx){
            var classes = 'liteam';
            if (val.onEdit) classes += ' edit';
            else if (!val.onEdit) classes += ' add';
            return (
                    <li className={classes} ref='item' key={idx}><span className='spanteam'>{val.val}</span>
                    <input className='inputteam' ref='input' type="text" value={val.val} onChange={this.onChange.bind(this,idx)}/>
                    <button className='editbtn' onClick={this.edit.bind(this,idx)}>edit</button>
                    <button className='removebtn' onClick={this.del.bind(this,idx)}>remove</button>
                    <button className='okbtn' onClick={this.ok.bind(this,idx)}>ok</button>
                    <button className='cancelbtn' onClick={this.cancel.bind(this,idx)}>cancel</button></li>
            );
        }, this);
        return (
            <div>
                <form onSubmit={this.add}>
                    <input className={inputCss} ref="add" type="text" onKeyDown={this.keyEnter} placeholder="write something..."/><button className='addbtn' onClick={this.add} >add</button>
                </form>
                <ul>
                    {list}
                </ul>
            </div>

        );

    }
});

ReactDOM.render(<App />,document.getElementById('addTxt'));
