const cardGrid = () => {
    //Get all grids on page.
    const grids = document.getElementsByClassName('code-grid');
  
    //Iterate through grids.
    for (let i = 0; i < grids.length; i++) {
      const cards = grids.item(i).getElementsByClassName('card');
      const rows = Math.ceil(cards.length / 2);
      const oddCard = cards.length % 2;
      //Set number of rows
      grids.item(i).style.gridTemplateRows = `repeat(${rows}, auto)`;
      
      //Spans an odd card at the bottom across two frames.
      if (oddCard === 1) {
        const last = cards.length - 1;
        cards.item(last).style.gridColumn = '1 / span 2';
    }
    } 
  }