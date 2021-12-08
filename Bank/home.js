function Home(){
  return (
    <Card
      bgcolor="info"
      txtcolor="white"
      header="EasyMoney Bank"
      title="Welcome to the easy banking"
      // text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
