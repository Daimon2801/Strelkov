const { exit } = require('process');

class Game{
    constructor(arr){
        this.arr=arr;
    }
    menu(){
        var count=0;
        var x=[];  
        x[0]=[];
        x[1]=[];  
        x[0][count]="0";
        x[1][count]="exit";
        count++;
        console.log("Available moves:")
        for(let i in arr)
        {
          console.log(count,"-",arr[i]);
          x[0][count]=count.toString();
          x[1][count]=arr[i];
          count++;
        };
        console.log("0-exit\n?-help")
        x[0][count]="?";
        x[1][count]="Help";
        return x;     
    };
    help(mas){
        let h=new rules(mas);
        var arr_temp=[];
        arr_temp=h.rule(mas);
        return arr_temp;
    };
    check(arr){
        var check=true;
       if(arr.length<=1)
       {
           console.log("You should enter parameter bigger then one!")
            check=false;
       }else{
           if(arr.length%2==0){
               console.log("You should enter odd number of parameters!");
               check=false;
           };
       };
       return check;
    };
    play(){
        var readlineSync = require('readline-sync');
        var arr_final=[];
        arr_final[0]=[];
        arr_final[1]=[];
        var arr_table=[];
        var check=true;
        var movePC=-1;
        var moveUser=" ";
        let hmac=new HMAC();  
        while(check){
         movePC=Math.floor(Math.random() * arr.length); 
         console.log("HMAC:")
         hmac.createHmac(arr[movePC]); 
         arr_final=game.menu();
         arr_table=game.help(arr_final);
         let t=new table(arr_table,arr_final);
         moveUser=readlineSync.question('Enter your move:').toString();
         if (moveUser==0){
             break;
         }else{
            if (moveUser=="?"){
             t.tabl(); 
            }else{
                if (arr_final[0].indexOf(moveUser)==-1){
                    cosnole.log('Move is not correct!');
                }else
                {
                    console.log('Your move:',arr_final[1][Number(moveUser)-1]);
                    console.log('Computer move:',arr_final[1][movePC]);
                    console.log('You',arr_table[movePC][Number(moveUser)-1],'!');
                    console.log("HMAC key:")
                    hmac.createHmac(arr[Number(moveUser)-1]); 
                };
             };
            }
        };       
    };
};
class rules{
    constructor(moves){
        this.moves=moves;
    }    
    rule(moves){
        moves[0]=moves[0].slice(1,-1);
        moves[1]=moves[1].slice(1,-1);
        var x=[];
       for (let i=0;i<moves[0].length;i++){
        x[i]=[];
        };
        for(let i=0;i<moves[0].length;i++){
            for(let z=i-(moves[0].length/2>>0);z<i;z++){
                if (z<0){
                   x[i][moves[0].length+z]="lose";  
                }else{
                    x[i][z]="lose"; 
                };
                
            };
            for(let k=i+1;k<i+1+(moves[0].length/2>>0);k++){
                let temp=k;
                if(k>=moves[0].length){
                     temp=temp-(moves[0].length);
                };
                x[i][temp]="win";
            };
            x[i][i]="draw";
        }; 
        return x;
    };
};
class table{
    constructor(a_table,t_name){
        this.a_table=a_table;
        this.t_name=t_name;
    }
    tabl(){ 
        console.table(this.a_table);
    };
};
class HMAC{
    constructor(){
        const crypto = require('crypto');
        this.secret =crypto.randomBytes(32);
    }
    createHmac(move){
        const crypto = require('crypto');
        const hash = crypto
          .createHmac('sha256', this.secret)
          .update(move)
          .digest('hex');
        console.log(hash);
    };
}
var arr=process.argv.slice(2);
let game=new Game(arr);
if(!game.check(arr)){process.exit(-1);};
game.play();
