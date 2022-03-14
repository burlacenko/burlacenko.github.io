import Card from './Card.js';
import image from "../images/bank.png";

function Home(){
    return (
      <Card
        bgcolor="info"
        txtcolor="white"
        // txtcolor="#000"
        header="EasyMoney Bank®"
        title="Welcome to the easy banking® (v.3)"
        // text="You can move around using the navigation bar."
        body={(<img src={image} className="img-fluid" alt="Bank Logo"/>)}
      />    
    );  
};

export default Home;
  