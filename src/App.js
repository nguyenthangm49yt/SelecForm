  
import React from "react";
import  MulipleSelect  from "./Components/MulipleSelect"
import  BasicSelect  from "./Components/BasicSelect"
const children = [];  
const children2 = [];    
for(let i = 10; i< 36 ;i++){
   children.push(
     {
       title: i.toString(36) + i.toString() ,
       isCheck: false
     })
     children2.push(
      {
        title: i.toString(36) + i.toString() ,
        isCheck: false
      })
}

  function App( ) {
    
    return (
       
      <div className = "container">
       
        <BasicSelect  placeholder = "please choose" data={children}></BasicSelect>
       
       
       
       <MulipleSelect  placeholder = "please choose" data={children2}></MulipleSelect>
      
        
      </div>
       
    )
  }

  export default App;
