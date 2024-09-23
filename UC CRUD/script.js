//  A function that access the changed array of objects
let store;
  function DATA (){
  fetch('https://dummyjson.com/posts')
  .then(res => res.json()) 
  .then((data)=>{
  console.log(data.posts);
  // let z=data.posts yeh nahi hora idk why
  store={
    z:data.posts
   };
  });
  return store;
}


// GET REQUEST

document.getElementById("getRequest").addEventListener("click",getRequest);
let storageDiv = document.getElementById("output");
let output;
function getRequest(){
    fetch('https://dummyjson.com/posts') // returns a resolved promise ,value is the data we want 
    .then(res => res.json()) //returns a resolved promise whose value is the data in the json format
    .then((data)=>{
       let x= data.posts;
       x.forEach((user)=>{
       storageDiv.innerHTML +=`
       <ul class="list-group mb-3">
       <li class="list-group-item">ID: ${user.id}</li>
       <li class="list-group-item">Title: ${user.title}</li>
       </ul>
       `
     })
    })
    }

// POST REQUEST

document.getElementById("postRequest").addEventListener("click",postRequest);
function postRequest(){
    let title = document.getElementById("title").value; 
    let body = document.getElementById("body").value;
    fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          "title" : title,
          "userId" : body,
        }) 
      })
      .then(res => res.json())
      .then((data)=>{

        console.log(data); // this prints the object which i have added on the webpage
        DATA();
        // x.push(data); for security reasons its not allowing me to do this 
        // my data which is posted is stored in output string
        let newPost = `
        <ul class="list-group mb-3">
        <li class="list-group-item">ID: ${data.userId}</li>
        <li class="list-group-item">Title: ${data.title}</li>
        </ul>
        `
       storageDiv.innerHTML += newPost;
      })
      .then(alert("Succesfully posted data"));
}

// DELETE REQUEST

document.getElementById("deleteRequest").addEventListener("click",deleteRequest);

 function deleteRequest(){

  let body = prompt("Which ID do you want to delete?");
  fetch(`https://dummyjson.com/posts/${body}`, {
    method: 'DELETE',
  })

  .then(res => res.json())  // Deletedata contains the object which is deleted
  .then((Deletedata)=>{
   console.log(Deletedata) // printing the object that i want to delete

    
   fetch('https://dummyjson.com/posts')
   .then(res => res.json()) 
   .then((data)=>{
   let x = data.posts;

   storageDiv.innerHTML="";

   x.forEach((user)=>{
   if(user.id!=Deletedata.id){
     let newUpdatedPost =`
   
     <ul class="list-group mb-3">
     <li class="list-group-item">ID: ${user.id}</li>
     <li class="list-group-item">Title: ${user.title}</li>
     </ul>
     `
     storageDiv.innerHTML += newUpdatedPost;
     }
    })
   })
 })
}

// UPDATE REQUEST
document.getElementById("updateRequest").addEventListener("click",updateRequest);

function updateRequest(){
let updateId=prompt("Which id do you want to update?");

let updateTitle=prompt("Please fill the input box with the new title.");

fetch(`https://dummyjson.com/posts/${updateId}`, {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: updateTitle,
  })
})
.then(res => res.json())
.then((updatedData)=>{
  console.log(updatedData); // updatedData contains the updated object

  fetch('https://dummyjson.com/posts')
  .then(res => res.json()) 
  .then((data)=>{
  let x = data.posts;  // here x contins the array of 30 objects.
  
  storageDiv.innerHTML="";
  
  // each object will go to the user object one by one 
  x.forEach((user)=>{

    let newUpdatedPost;
  if(user.id==updatedData.id){

    newUpdatedPost =`
  
    <ul class="list-group mb-3">
    <li class="list-group-item">ID: ${updatedData.id}</li>
    <li class="list-group-item">Title: ${updatedData.title}</li>
    </ul>
    `
    storageDiv.innerHTML += newUpdatedPost;
    }

    else{
      newUpdatedPost =`
  
      <ul class="list-group mb-3">
      <li class="list-group-item">ID: ${user.id}</li>
      <li class="list-group-item">Title: ${user.title}</li>
      </ul>
      `
      storageDiv.innerHTML += newUpdatedPost;
    
    }
   })
  })
});
}



// i am not able to store the array of 30 objects of mine
// how should i store my data.posts?????
// using post request firstly i am not able to append my newly created object to the list of 30 objects .
// using post request the object which i am getting is having a userId =31 and not id =31

// when i am deleting any id then i am not able to do it on the prevous 31 array of objects 

// when i am deleting an object i am actually getting an object whose id is 31 which is idelly not possible !!


