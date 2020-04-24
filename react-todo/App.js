import React, { useState, useEffect } from 'react';
import {Route, useHistory} from 'react-router-dom'
import {List, AddList, Tasks,} from  './components'
import ListSvg from './assets/img/list.svg'
import axios from 'axios'


function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] =useState(null)
  const [activeItem, setActiveItem] =useState(null)
  let history =useHistory()

useEffect(() => {
  axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
    setLists(data)
  });
  axios.get('http://localhost:3001/colors').then(({data}) => {
    setColors(data)
  })
 }, [])

const onAddList = obj => {
  const newList = [
    ...lists,
    obj
  ]
  setLists(newList)
}

const onAditListTitle = (id, title) => {
  const newList = lists.map(item => {
    if(item.id === id) {
      item.name = title
    }
    return item
  })
  setLists(newList)
}

const onAddTask = (listId, taskObj) => {
  const newList = lists.map(item => {
    if(item.id === listId) {
      item.tasks = [...item.tasks, taskObj]
    }
    return item
  })
  setLists(newList)
}

const onEditTask = (listId, taskObj) => {
  const newTaskText = window.prompt('Тeкст задачи', taskObj.text)

  if(!newTaskText) {
    return;
  }

  const newList = lists.map(list => {
      if(list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if(task.id === taskObj.id) {
            task.text = newTaskText
          }
          return task
        })
      }
      return list
    })
    setLists(newList)
    axios.patch('http://localhost:3001/tasks/' + taskObj.id, {text: newTaskText}).catch(() => {
        alert('Не удалось удалить задачу')
    })
  }


const onRemoveTask = (listId, taskId) => {
  if(window.confirm("Вы действительно хотите удалить задачу?")) {
    const newList = lists.map(item => {
      if(item.id === listId) {
        item.tasks = item.tasks.filter(task => task.id !== taskId)
      }
      return item
    })
    setLists(newList)
    axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
        alert('Не удалось обновить задачу')
    })
  }
}

const onCompleteTask =(listId, taskId, completed) => {
  const newList = lists.map(list => {
    if(list.id === listId) {
      list.tasks = list.tasks.map(task => {
        if(task.id === taskId) {
          task.completed = completed
        }
        return task
      })
    }
    return list
  })
  setLists(newList)
  axios.patch('http://localhost:3001/tasks/' + taskId, {completed}).catch(() => {
      alert('Не удалось обновить задачу')
  })
}

useEffect(() => {
  const listId = history.location.pathname.split('lists/')[1]
  if(lists) {
    const list = lists.find(list => list.id === Number(listId))
    setActiveItem(list)
  }
}, [lists, history.location.pathname])

  return (
    <div className='todo'>
      <div className="todo__sidebar">
        <List 
          onClickItem={list => {
           history.push('/')
          }}
          items={[
          {
            icon: <img className='todo__img' src={ListSvg} alt="List icon" />,
            name: 'Все задачи',
            active: (!activeItem)
          }
        ]}
        />
        
        {lists ? (
          <List
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            isRemovable
            onClickItem={list => {
              history.push(`/lists/${list.id}`)
            }}
            activeItem={activeItem}
          />
        ) : (
          'Загрузка...'
        )}
        <AddList onAdd={onAddList} colors={colors} />

      </div>

      <div className="todo__tasks">
        <Route exact path='/'>
          {lists && lists.map((list, index) => (
            <Tasks 
              key={index}
              onRemoveTask={onRemoveTask}
              onEditTitle={onAditListTitle} 
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              list={list} 
              withoutEmpty
            />
          ))}
        </Route>
        <Route path='/lists/:id'>
          {lists && activeItem && 
            <Tasks 
              list={activeItem} 
              onRemoveTask={onRemoveTask}
              onEditTitle={onAditListTitle} 
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
            />
          }
        </Route>
      </div>
    </div>
  );
}

export default App;
