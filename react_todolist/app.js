var App = React.createClass({
    getInitialState:  function(){
        return {todoList : [{val:'123',onEdit:false}]}

    },
    keyEnter:function(e){
        if(e.keyCode==13){
            this.add();
        }
    },
    add:function(e){
        var temp = this.state.todoList;
        var textNode = ReactDOM.findDOMNode(this.refs.add).value;
        if (textNode===''){
            this.setState({emptyInput:true});
        }else{
            var obj={val:textNode,onEdit:false}
            temp.push(obj);
            this.setState({'todoList':temp})
            ReactDOM.findDOMNode(this.refs.add).value='';
            this.setState({emptyInput:false});
        }
    },

    edit: function(index) {
        var temp = this.state.todoList;
        temp[index].onEdit = true;
        this.setState({'todoList':temp});
    },
    del: function(index) {
        var temp = this.state.todoList;
        temp.splice(index,1);
        this.setState({'todoList':temp});
    },
    ok: function(index){
        //var changeTemp = this.state.changeVal;

        var change = this.state.changeState;
        var temp = this.state.todoList;
        if(change){
            var newVal = this.state.newValue;
            console.log(newVal);
            var obj={val:newVal,onEdit:false}
            temp[index] = obj;
            this.setState({changeState:false})
        }else{
            temp[index].onEdit=false;
        }
        this.setState({'todoList':temp});

    },
    cancel: function(index){
        var temp = this.state.todoList;
        temp[index].onEdit = false;
        this.setState({'todoList':temp});
    },
    onChange: function(e)
    {
        var newVal = e.target.value;
        this.setState({ newValue:newVal,changeState:true})
    },
    componentWillMount: function() {
        console.log('componnentWillMount()');

    },
    componentDidMount: function() {
        console.log('componentDidMound');
    },
    render: function() {
        var _this = this;
        var empty = this.state.emptyInput;
        var inputCss='spanteam';
        if(empty) inputCss = 'empty'
        var list = this.state.todoList.map(function(val, idx){
            var classes = 'liteam';
            if (val.onEdit) classes += ' edit';
            else if (!val.onEdit) classes += ' add';
            return (
                    <li className={classes} ref='item' key={idx}><span className='spanteam'>{val.val}</span>
                    <input className='inputteam' ref='input' type="text" defaultValue={val.val} onChange={this.onChange}/>
                    <button className='editbtn' onClick={this.edit.bind(this,idx)}>edit</button>
                    <button className='removebtn' onClick={this.del.bind(this,idx)}>remove</button>
                    <button className='okbtn' onClick={this.ok.bind(this,idx)}>ok</button>
                    <button className='cancelbtn' onClick={this.cancel.bind(this,idx)}>cancel</button></li>

            );
        }, this);
        //console.log(list)
        return (
            <div>
                <input className={inputCss} ref="add" type="text" onKeyDown={this.keyEnter}/><button className='addbtn' onClick={this.add} >add</button>
                <ul>

                    {list}
                </ul>
            </div>

        );

    }
});

ReactDOM.render(<App />,document.getElementById('addTxt'));
