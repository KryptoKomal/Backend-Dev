// DAY 1

const user={name:"annu don", 
    email: "annu_the_don_mafia@gmial.com", 
    phone: "234567890",
    password:"annu_the_badmosh_mafia",
    social: {fb: "https://annufb.com",
              insta: "annu_the_don_ka_insta.com"
    }
};

const username=user.name;  // extracting username from user object
// const email= user.email;

const{name , email, phone , social}=user;  //extarcting name , email phone etc from user obj
user.social.fb="";
const updatedUser={...user, address:"mathura"};
const user1=user;    // without spread operator
// const user1={...user};  //spread operator
user1.name="Ajay";
console.log(user.name);
console.log("updateData", updatedUser)

const {password, ...publicData}=user;  //by using rest operator we can encrypt the user password
console.log("public password", publicData);

const numbers=[1,2,3,4,5]

const newNumbers=numbers.map((number)=>number*2)   // map function return new array
console.log(newNumbers);

const sumOfNumbers= numbers.reduce((sum,num) => sum+num,0);
console.log("",sumOfNumbers)


//async
console.log("fetching user data from db");
    let user;
    setTimeout(() => {
        user={name:"xyz", phone:"456789", address:"rtyuh"}
        console.log("setTimeout task")

    },0);
    console.log(user);
    Promise.resolve(() => console.log("task3"));

// const fetchUser=(userId)=>{
//     return new Promise((resolve,reject)=>{
//         const users={1:{name:"rtyui", email:"dfgh", address:"dxcfgvbhjk"},
//                     2:{name:"hjnh",email:"erctfgybh",address:"xcfvgybh"}
//                 }
//     })
//     const user = users[userId]
    

// }