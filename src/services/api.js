
const baseUrl = 'http://ec2-34-210-46-90.us-west-2.compute.amazonaws.com:8042/api/v1'
const client_id = '2'
const client_secret = '5q2UcY4rwEwsOIWk3ssiSBLUBYW3cH3u'

const api = {
    authentication: {
        async SignIn(email, password) {
            const response = await fetch(baseUrl + '/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "grant_type": 'client_credentials',
                    "email": email,
                    "password": password
                })
            })
            const data = await response.json()
            return data
        },
        async SignUp(userName, email, password) {
            const response = await fetch(baseUrl + '/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "grant_type": "client_credentials",
                    "username": userName,
                    "email": email,
                    "password": password
                })
            })
            const data = response.json()
            return data
        }
    },
    user: {
        async completeProfile(token, gender, number, imgBase64) {
            console.log('img', imgBase64)
            const response = await fetch(baseUrl + '/me',{
                method: 'PUT',
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    gender: gender,
                    phone: number,
                    avatar: 'data:image/png;base64,' + imgBase64
                })
            })
        },
        async getInfo(token) {
            const response = await fetch(baseUrl + '/me', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token,
                }
            })
            const data = response.json()
            return data
        },
         async createNewWallet(token){
            const response = await fetch(baseUrl + '/wallet', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token,
                },
            })
            const data = await response.json()
            console.log('data', data)
            return data
        }
    },
    payments: {
        async transfer(token, from, to, amounts) {
            console.log('from', from, 'to', to, 'amounts', amounts)
            const response = await fetch(baseUrl + '/payment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    "amounts": amounts,
                    "from_address": from,
                    "to_address": to
                })
            })
            const data = response.json()
            return data
        }
    },
    wallet:{
        async getStatistics(token, id){
            const response = await fetch(baseUrl + '/wallets/' + id + '/stats', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token,
                }
            })
            const data = await response.json()
            console.log('data in api', data)
         return data   
        }
   }

}

export default api