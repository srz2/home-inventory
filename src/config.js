import env from 'react-dotenv'

var local_dev;
if (env.LOCAL_DEV !== undefined && env.LOCAL_DEV === 'true'){
    local_dev = true;
} else {
    local_dev = false;
}

const config = {
    LOCAL_DEV: local_dev,
    API_KEY: env.api_key
}

export default config;