import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import Badge from '../Badge/Badge'
import RemoveSvg from '../../assets/img/remove.svg'
import './List.scss'

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

    const removeList = item => {
        if(window.confirm("Вы действительно хотите удалить список?")) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }
    
    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => {
                    return(
                        <li 
                          key={index} 
                          className={classNames(item.className, {
                            active : item.active
                                   ? item.active
                                   : activeItem && activeItem.id === item.id})}
                            onClick = {onClickItem ? () => onClickItem(item) : null}
                        >
                            {item.icon ? item.icon : <Badge color={item.color.name} />}
                            <span>
                                {item.name}
                                {item.tasks && ` (${item.tasks.length})`}
                            </span>
                            {isRemovable && 
                            <img 
                               className="list__remove-icon" 
                               src={RemoveSvg} 
                               alt="Remove button"
                               onClick={() => removeList(item)}
                            />}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default List