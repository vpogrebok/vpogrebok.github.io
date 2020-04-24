import React from 'react'
import axios from 'axios'
import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'
import AddTasksForm from './AddTasksForm'
import Task from './Task'

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {
    const editTitle = () => {
        const newTitle = window.prompt('Назавание списка', list.name)
        if(newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    }

    return (
        <div className="tasks">
          <h2 style={{color: list.color.hex}} className="tasks__title">
              {list.name}
              <img onClick={editTitle} src={editSvg} alt="Write title"/>
          </h2>

          <div className="tasks__items">
              {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
              {list.tasks && list.tasks.map(task => (
                <Task 
                    key={task.id} 
                    {...task} 
                    onRemove={onRemoveTask} 
                    list={list}
                    onEdit={onEditTask}
                    onComplete={onCompleteTask}
                  />
                ))}
                <AddTasksForm
                    key={list.id}
                    list={list}
                    onAddTask={onAddTask}
                />
          </div>
          
        </div>
    )
}

export default Tasks