import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from '../List/List'
import AddSvg from '../../assets/img/add.svg'
import './AddList.scss'
import Badge from '../Badge/Badge'
import closeSvg from '../../assets/img/close.svg'

const AddList = ({ colors, onAdd }) => {
    const [visiblePopup, setvisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [valueInput, setValueInput] = useState('')

    useEffect(() => {
        if (Array.isArray(colors)) {
          selectColor(colors[0].id);
        }
      }, [colors]);

    const onClose = () => {
        setvisiblePopup(false)
        setValueInput('')
        selectColor(colors[0].id)
    }

    const addList = () => {
        if(!valueInput) {
            alert('Введите название папки');
            return
        }

        setIsLoading(true)
        axios.post('http://localhost:3001/lists', {name: valueInput, colorId: selectedColor}).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0];
            const listObj = {...data, color, tasks: []}
            onAdd(listObj)
            onClose()
        }).catch(() => {
            alert('Ошибка при добавлении задачи!')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return(
        <div className="add-list">
            <List 
                onClick={() => setvisiblePopup(true)}
                items={[
                {
                    className: 'list__add-button',
                    icon: <img className='todo__img todo__img--add' src={AddSvg} alt="List icon" />,
                    name: 'Добавить список'
                }
            ]}
            />
            {visiblePopup && <div className="add-list__popup">
                <img 
                   onClick={onClose}
                   src={closeSvg} 
                   alt="close button" 
                   className="add-list__popup-close-btn"/>
                <input 
                   value={valueInput}
                   onChange={e => setValueInput(e.target.value)}
                   className="field" 
                   type="text" 
                   placeholder='Название папки' />
                <div className="add-list__popup-colors">
                    {colors.map(color => (
                        <Badge 
                           onClick={() => selectColor(color.id)}
                           key={color.id} 
                           color={color.name}
                           className={selectedColor === color.id && 'active'}
                            />
                    ))}
                </div>
                <button 
                    className="button"
                    onClick={addList}
                >
                        {isLoading ? 'Добавляеться' : 'Добавить'}
                </button>
            </div>}
        </div>
    )
}
export default AddList