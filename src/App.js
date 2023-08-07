import { useState } from "react";
import './App.css'



function App() {
  const [work, setWork] = useState('')
  const [todos, setTodo] = useState(
    [{ id: 1, name: "Uống nước",  },
    { id: 2, name: "Viết App todo", completed:true },
    { id: 3, name: "Đi ngủ" }
    ])
  const [editId, setEditId] = useState(0)
  console.log(editId)



  const validateInput = () => {
    if (work === '') {
      alert('Bạn chưa thêm nhiệm vụ mới !')
    }
    else {
      handleAdd()
    }
  }

  const handleAdd = () => {
    if (todos?.some(item => item.id === work.replace(/\s/g, ''))) {
      alert('Nhiệm vụ đã được thêm vào trước đó !')
    }
    else {
      setTodo([...todos, { id: work.replace(/\s/g, ''), name: work }])
      setWork('')
    }

    if (editId) {
      const editTask = todos.find(item => item.id === editId)
      const updateTodo = todos.map((item) =>
        item.id === editTask.id ? item = { id: work.replace(/\s/g, ''), name: work } : { id: item.id, name: item.name }
      )
      setTodo(updateTodo)
      setEditId(0)
      return
    }
  }
  console.log(todos)


  const handleDelete = (id) => {
    console.log(id)
    setTodo(todos.filter(item => item.id !== id))
  }

  const handlEdit = (id) => {
    const editTodo = todos.find(item => item.id === id)
    setWork(editTodo.name)
    setEditId(id)
  }

  const handleDeleteAll = () => {
    setTodo([])
    setWork('')
  }

  const handleComplete = (id) => {
    const checkTodo = todos.map((item) => {
      if(item.id ===id) {
        return{...item, completed: !item.completed} // 
      }
      else 
        return item
    })
    setTodo(checkTodo)
  }




  return (
    <div className="App">

      <div className="flex flex-col justify-center h-screen items-center ">
        <div className="flex gap-4">
          <input
            type="text"
            className="outline-none border-2 border-sky-400 px-3 py-1 w-80 rounded focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            placeholder="Add your new task"
            value={work}
            onChange={e => setWork(e.target.value)}
          />

          <button
            type="button"
            className='outline-none bg-sky-400 px-3 py-[6px] rounded font-bold text-white hover:bg-sky-700'
            onClick={validateInput}
          > ADD
          </button>
        </div>

        <div>
          <h4 className="font-bold"> LIST TO DO  </h4>
        </div>
        <div>
          <ul >
            {todos?.map(item => {
              return (

                <li className="flex justify-between px-3 py-1 w-[400px] rounded bg-sky-400 mt-2 relative " key={item.id}>
                  <span className={`${item.completed?"checked":''}`}> 
                      {item.name}
                  </span>
                
                  <input
                    type="checkbox"
                    className="flex cursor-pointer rounded-full p-3 absolute  right-[90px] top-3"
                    checked={item.completed}
                    onChange={() => handleComplete(item.id)}
                  >
                  </input>

                  <div>
                    <button
                      type="button"
                      className=' outline-none bg-sky-400 px-2 py-[2px] rounded hover:text-green-700 font-bold'
                      onClick={() => handlEdit(item.id)}
                    > EDIT
                    </button>

                    <button
                      type="button"
                      className=' outline-none bg-sky-400 px-2 py-[2px] rounded hover:text-red-500 font-bold'
                      onClick={() => handleDelete(item.id)}
                    > X
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

        </div>
        <button
          type="button"
          className='outline-none bg-black px-3 py-[6px] rounded font-medium text-white hover:bg-red-600 mt-2'
          onClick={handleDeleteAll}
        > CLEAR ALL
        </button>
      </div>
    </div>

  );
}

export default App;
