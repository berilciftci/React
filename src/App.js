import React , { Component } from 'react';
import { Table, Modal, ModalBody,ModalHeader,ModalFooter  } from 'reactstrap';
import { Button , Input, FormGroup,Label,  } from 'reactstrap';
import axios from 'axios';

//renkler için npm install react-color-picker



class App extends Component{
  state = {
    book : [],
    newBookData:{
      name:'' ,
      year: '',
      author:'',
    },
    newBookModal : false
   
  }

  componentWillMount(){


    axios.get('http://localhost:8080/library/books').then((response) => {
      this.setState({
        book:response.data
       
      });

    }
    
    ) ;
  }
  toggleNewBookModal(){
    this.setState(
      {
        newBookModal : ! this.state.newBookModal
      }
    );

  }
  addBook(){
    axios.post('http://localhost:8080/library/books', this.state.newBookData).then((response)=>{
      let {books} =this.state;
      books.push(response.data);
      this.setState({books});
    });
  }
  

   
  render(){
    let book = this.state.book.map((book) =>{
      return (
        <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.year}</td>
              <td>{book.author}</td>
              <td>
                <Button  color="info" size="sm" className="mr-3">Edit</Button>
                <Button color="success" size="sm">Delete</Button>


              </td>
            </tr>

      )

    });
    return (
    
      <div className="App container ">

         <Button color="danger" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book </ModalHeader>
          <ModalBody>

          <FormGroup>

            <Label for="name">Name</Label>
            <Input id = 'name' value ={this.state.newBookData.name}onChange={(e)=> {
              let {newBookData} = this.state;
              newBookData.name=e.target.value;
              this.setState({newBookData});
            }} />
      </FormGroup>
       <FormGroup>

          <Label for="year">Year</Label>
          <Input id= 'year ' value ={this.state.newBookData.year}onChange={(e)=> {
            let {newBookData} = this.state;
            newBookData.year=e.target.value;
            this.setState({newBookData});

          }} />
       </FormGroup>
       <FormGroup>

          <Label for="author">Author</Label>
          <Input id = 'author' value={this.state.newBookData.author}onChange={(e)=>{
            let {newBookData} = this.state;
            newBookData.author=e.target.value;
            this.setState({newBookData});

          }} />
        </FormGroup>
       
      
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>ok</Button>
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        <Table>
          <thead> 
            <tr>
              <th>#</th>
              <th>Name </th>
              <th>Year</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {book}
        
            
            
          </tbody>
          

        </Table>
        
      </div>
    );
  }

  }


export default App;
