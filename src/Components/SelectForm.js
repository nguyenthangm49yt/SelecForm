
import React, { useState } from 'react';
import '../index.css';
import { AiOutlineClose ,AiOutlineCheck } from "react-icons/ai";
 
 
const BasicSelect = (props) => {
    
    const {data, isOpen, handleOpen } = props
    const [selected, SetSelected] = useState(null)
    const [list, SetList] = useState(data)
  
   
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
const MultipleSelect = (props) => {
    
    const {placeholder, data, handleOpen , isOpen } = props
    const [selectedList, setSelectedList] = useState([])
    
    const filterData = () =>{
        for(let i =0 ; i< selectedList.length; i++){
            data.find(v => v.title === selectedList[i]).isCheck = true ;
            
        }
     
        return data
            
    }

    const FilterData = filterData( );
 
    const handleSelect = (item)=>{
        if (item.isCheck) {
            handleRemoveItem(item.title)
        }

        else{
            const newSelectedList = selectedList.concat(item.title)
            setSelectedList(newSelectedList)
        }

    }
    const handleRemoveItem = ( title) => {
        
        const result =  selectedList.filter(item => item !== title)
        data.find(v => v.title === title).isCheck = false ;
        setSelectedList(result)
    }

    
    return(
        <>
         <p>Multiple Select</p>
                <div className = 'select-input select-input-multiple'>
                    <div className ='selected-list'>
                        {
                        
                        selectedList.map((item, index) => (
                                    
                                    <div className="selected-item" key={index}>

                                        <span> {item === null ?  placeholder : item}</span>

                                        <span onClick = {() =>  handleRemoveItem(item)}>
                                        < AiOutlineClose  />    
                                        </span>
                                    </div>
                                ))
                            
                        }
                    </div>
                    <div className="select-click" onClick={handleOpen} />
                </div>
                
           
                {
                    isOpen? (
                        <div className="select-list">
                        {
                            FilterData.map((item, index) => (
                            <div className="select-item"
                            key={index}
                            onClick ={() => handleSelect(item )}
                            >
                                    <div className='title'>{item.title}</div>
                                    { item.isCheck? <AiOutlineCheck />: ""  }
                            </div>
                            )
                        )}
                        </div>
                    ) : ('')
                }
        </>
    )
}

class SelectForm extends React.Component {
    constructor(props){
        super(props);
        this.wrapperRef = React.createRef()
        this.state = {
            mode : "",
            isOpen : false,
            data : this.props.data,
            
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown',   this.handleClickOutside );
    }
    
    componentWillUnmount() {  
        document.removeEventListener('mousedown', this.handleClickOutside );
    }

    handleClickOutside = (event ) => {
        const { target } = event
        if (!this.wrapperRef.current.contains(target)) {
            this.setState( {
                isOpen : false
            })
        }
    }
    handleOpen = () =>{
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    
 
    render(){
        const {placeholder , mode , data} = this.props;
        const {isOpen} = this.state;
        
        return(
          
            <div ref={this.wrapperRef} className ='custom-option'>
         
                {(() => {
                    switch (mode){
                        case 'basic' : 
                            return  (
                                <BasicSelect 
                                placeholder = {placeholder}
                                isOpen={isOpen}
                                data={data}
                                handleOpen={this.handleOpen}
                                ></BasicSelect> 
                            );
                        
                        case 'multiple' : 
                            return  (
                                <MultipleSelect 
                                placeholder = {placeholder}
                                isOpen={isOpen}
                                data={data}
                                handleOpen={this.handleOpen}
                                ></MultipleSelect> 
                            );

                        default : return null;
                    
                    }
    
                 })()}

            </div>
        )
    }
}

export default SelectForm;