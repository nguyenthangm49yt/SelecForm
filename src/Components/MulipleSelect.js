
import React from 'react';
import '../index.css';
import { AiOutlineClose ,AiOutlineCheck } from "react-icons/ai";
 


class MulipleSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
         
            SelectedList : []
        }
    }
    handleOpen = () =>{
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    handleSelect = (item)=>{
      
        if (item.isCheck) {
           
            this.handleRemoveItem(item.title)
        }

        else{
            const {SelectedList} = this.state;
            if (!this.state.isOpen) {
                document.addEventListener('click', this.handleOutsideClick, false);
            } else {
                document.removeEventListener('click', this.handleOutsideClick, false);
            }
            this.setState(prevState => ({
                SelectedList: SelectedList.concat(item.title)
            }))
        }

    }
    handleRemoveItem = ( title) => {
        
        const { SelectedList } = this.state;
        const {data} = this.props
        const result =  SelectedList.filter(item => item !== title)
        data.find(v => v.title === title).isCheck = false ;
        this.setState({
        SelectedList: result
        });
    }

    filterData = () =>{
        
        const { data } = this.props;
        const {SelectedList} = this.state ;
        for(let i =0 ; i< SelectedList.length; i++){
            data.find(v => v.title === SelectedList[i]).isCheck = true ;
            
        }
     
        return data
       
        
        
    }
 
    render(){
        const {placeholder, data} = this.props;
        const {isOpen, isSelected, SelectedList} = this.state;
        const filterData = this.filterData( );
        return(
            <div className ='custom-option'>
                <p>Multiple Select</p>
                <div className = 'select-input select-input-multiple'>
                    <div className ='selected-list'>
                        {
                        
                                SelectedList.map((item, index) => (
                                    
                                    <div className="selected-item" key={index}>

                                        <span> {item === null ?  placeholder : item}</span>

                                        <span onClick = {() =>  this.handleRemoveItem(item)}>
                                        < AiOutlineClose  />    
                                        </span>
                                    </div>
                                ))
                            
                        }
                    </div>
                    <div className="select-click" onClick={this.handleOpen} />
                </div>
           
            {
                isOpen? (
                    <div className="select-list">
                    {
                        filterData.map((item, index) => (
                        <div className="select-item"
                        key={index}
                        onClick ={() => this.handleSelect(item )}
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
}

export default MulipleSelect;