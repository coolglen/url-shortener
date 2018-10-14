new Vue({
    el: '#app',
    data: {
        success: false,
        name: '',
        url: ''
    },
    methods: {
        createPuny() {
            const body = {
                name: this.name,
                url: this.url
            }
            fetch('/api/puny', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                return response.json();               
            }).then(result => {
                if(result.error){
                    console.log(result.error)
                    return;
                } 
                if(result.isJoi){

                }else{
                    this.success = true;
                }
                              
            })
        }
    }
})