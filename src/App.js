  
import React from "react";
import  SelectForm  from "./Components/SelectForm"

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
        <SelectForm mode="basic"  placeholder = "please choose" data={children}></SelectForm>
        <SelectForm mode="multiple"  placeholder = "please choose" data={children2}></SelectForm>
      
      </div>
       
    )
  }

  export default App;
