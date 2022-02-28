// let's keep all instances (of client) syncronized
var syncTime = 500;
var myInstanceID = generateID(50);
console.log(myInstanceID);

function PlusMinus(props){
    function handle(e){
        if(e.target.id.includes('minus')){
            props.handle({name:props.section, value: -1});
            return;    
        }
        props.handle({name:props.section, value: 1});    
    }
    return (<>
        <img src={`icons/${props.section}_plus.png`} id="plus" onClick={((e) => handle(e))}/>
        <img src={`icons/${props.section}_minus.png`} id="minus" onClick={((e) => handle(e))}/>
    </>);
}

function Data(props){
    return (<div>
        Header:  {props.data.header}, 
        Left:    {props.data.left}, 
        Article: {props.data.article}, 
        Right:   {props.data.right}, 
        Footer:  {props.data.footer}
    </div>);
}

function update(section, value) {
    return new Promise((resolve, reject) => {
        var url = `/update/${section}/${value}/${myInstanceID}`;        
        superagent
            .get(url)
            .end(function(err, res){
                err ? reject(null) : resolve(res.body);
            });
    });
}

function read() {
    return new Promise((resolve, reject) => {
        var url = `/data/${myInstanceID}`;
        superagent
            .get(url)
            .end(function(err, res){
                err ? reject(null) : resolve(res.body);
            });
    });
}

function App(){
    const [data, setData]   = React.useState({header:0,left:0,article:0,right:0,footer:0}); 
    const [timer, setTimer] = React.useState(Date.now());
    const [lastUpdate, setLastUpdate] = React.useState(Date.now());

    React.useEffect(() => {
        /// the idea here is to allow a read cycle only after > 1s of last timer
        const response = read()
            .then(res => {
                // setTimer(Date.now());
                setData(res);
                setLastUpdate(Date.now());
                resetTimer();
        });        
    }, []); // empty array [] as a way of saying “only run on mount, and clean up on unmount”

    React.useEffect(() => {
        // let's keep all instances syncronized every syncTime
        let agora = Date.now();
        let timeElapsed = (agora - lastUpdate);
        if ( timeElapsed > syncTime) {
            autoUpdate();
        } 
    }, [timer]);  
    
    // let's keep all instances syncronized with autoUpdate
    function autoUpdate() {
        const response = read()
            .then(res => {
                setData(res);
                setLastUpdate(Date.now());
        });
    }

    function handle(section){
        // update db & local state
        const response = update(section.name, section.value)
            .then(res => {
                setData(res)
            });
    }

    function resetTimer(){
        setTimer(Date.now());
        setTimeout( resetTimer, 1000 );
    }

    return (<>
        <div className="grid">        
            <Header  handle={handle} data={data}/>
            <Left    handle={handle} data={data}/>
            <Article handle={handle} data={data}/>
            <Right   handle={handle} data={data}/>
            <Footer  handle={handle} data={data}/>
        </div>
    </>);
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);