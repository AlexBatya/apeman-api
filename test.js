const urlAll = 'http://localhost:3000';

const axiosConfigPOST = (elem, url) => {
    return {
        method: 'POST',
        url: urlAll + url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        },
        data: JSON.stringify(elem)
    }
};

(async () => {
    const data = {
        name: "alex"
    }
    const reqData = await axios(axiosConfigPOST(data, '/test'))
    console.log(reqData.data)
})();
