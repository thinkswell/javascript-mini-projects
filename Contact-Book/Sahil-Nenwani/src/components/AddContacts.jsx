import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class AddContacts extends React.Component{  
    state={
        name:"",
        email:"",
    }
    add=(e)=>{
        e.preventDefault();
        if (this.state.name==="" || this.state.email==="") {
            alert("All the feilds are mandatory")
            return
        }
        this.props.addConatctHandler(this.state);
        this.setState({
            name:"",
            email:""

        })
        this.props.history.push("/")
    }
    render(){
    return(
    <div className="m-3">
        <h1>Add Contacts</h1>    
        <form  onSubmit={this.add}>
        
        <div className="form-group col-md-4">
            <label for="exampleInputEmail1">Name</label>
             <input value={this.state.name} type="text" className="form-control" id="exampleInputEmail1"  placeholder="Name" onChange={(e)=>this.setState({name:e.target.value})} />
        
        </div>
        <div className="form-group col-md-4">
            <label for="exampleInputPassword1">Email</label>
            <input value={this.state.email} type="email" className="form-control"  placeholder="Email" onChange={(e)=>this.setState({email:e.target.value})} />
        </div>
            <button type="submit" className="btn btn-primary mt-2" >Add</button>
        </form>
    </div>
        );
    
    }

}

export default AddContacts



