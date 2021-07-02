import React, {   useState} from 'react';
import '../index.css';
import { AiOutlineClose ,AiOutlineCheck } from "react-icons/ai";
 
function BasicSelect ({data,placeholder}){
    
     

    const [selected, SetSelected] = useState(null)
 
    const [isOpen, SetIsOpen] = useState(false)

    const [list, SetList] = useState(data)
    const handleOpen = () => {
        SetIsOpen(!isOpen)
    }
   
    const handleSelect = (item)=>{

        let check = item.isCheck
        item.isCheck = !check

        if(!check && !selected ){
            
            SetSelected(item.title);
           
        }
        else if(!check && selected ){
            list.find(v => v.title === selected).isCheck = false ;
            SetSelected(item.title);
           
        }
        else{
          
            SetSelected('');
            
          
        }


    }
   return(

    <div className ='custom-option'>
        <p>Basic Select</p>
        <div className = 'select-input select-input-multiple'>
            <div className ='selected-item-1'>
                {
                selected === null ? "" :selected
                }
            </div>
            <div className="select-click" onClick={ handleOpen} />
        </div>

        {
            isOpen? (
                <div className="select-list">
                {
                    list.map((item, index) => (
                    <div className="select-item"
                    key={index}
                    onClick ={() => handleSelect(item)}
                    >
                            <div className='title'>{item.title}</div>
                            { item.isCheck? <AiOutlineCheck />: ""  }
                    </div>
                    )
                )}
                </div>
            ) : ('')
            }
     </div>
   ) 
}

export default BasicSelect;