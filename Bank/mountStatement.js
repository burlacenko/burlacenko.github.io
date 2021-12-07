function MountStatement ( {statement} ) {
//   var result = 
  statement.map( (item, index) => {
    // https://stackoverflow.com/questions/35762351/correct-way-to-handle-conditional-styling-in-react
    return (
      <li key={index} style={{ color: item.kind === 'D' ? 'red' : 'blue' }}>
        {item.entry}: {item.value} {item.kind}
      </li>
    );
  }

//   return result;
  );
}
