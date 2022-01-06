import Card from './Card.js';

function Home(){
    return (
      <Card
        bgcolor="info"
        txtcolor="white"
        // txtcolor="#000"
        header="EasyMoney Bank®"
        title="Welcome to the easy banking®"
        // text="You can move around using the navigation bar."
        body={(<img src=".\images\bank.png" className="img-fluid" alt="Bank Logo"/>)}
      />    
    );  
};

export default Home;
  