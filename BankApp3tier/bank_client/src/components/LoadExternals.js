import React from 'react';
import superagent from 'superagent';
import { UserContext, log } from '../context.js';

function LoadExternals(){

const ctx = React.useContext(UserContext);

React.useEffect(() => {
    getExternalIP();
  }, []);
  
const getExternalIP = () => {
        // alternatives for free ip:
        // https://checkip.amazonaws.com/
        // https://api.ipify.org/
        superagent.get('https://api.ipify.org/')
        .send({})
        .end((err, res) => {
        // the answer is processed here
        if (err) {
            //global.logger.error(err);
            log(err);
            return
        } else {
            log(res)();
            log(res.text)();
            const externalIP = res.text;
            // do some async action with result:
            // test if account is the same meaning user already exists:
            if (!externalIP) {
            return
            } else {
                ctx.externalIP = externalIP;
            }          
        }
        }) 
    }    

//   getExternalIP();

  return (
    <></>
  )
};

export default LoadExternals;