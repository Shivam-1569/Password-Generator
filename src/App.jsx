import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [length, setLength] = useState(8);

  let passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789";
    if(charAllowed) str+= "@!#$%&*";

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*(str.length)+1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,charAllowed,numberAllowed,setPassword])


  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])



  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <label htmlFor="passwordBox" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
              <div className='flex gap-2'>
                <input type="text" name="passwordBox" id="passwordBox" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} readOnly ref={passwordRef}/>
                <button type="submit" className=" text-white bg-slate-700 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 " onClick={copyPassword}>COPY</button>
              </div>
              <div className='flex gap-5'>
                <input type="range" min={0} max={30} value={length} onChange={(e)=>{
                  setLength(e.target.value)
                }} />
                <label htmlFor="range" className="font-light text-gray-500 dark:text-gray-300">Length: {length}</label>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" value={numberAllowed} onChange={()=>{
                  setNumber((turn)=>(!turn));
                }} />
                <label htmlFor="numberAllowed" className="font-light text-gray-500 dark:text-gray-300">Number</label>
                
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" value={charAllowed} onChange={()=>{
                  setChar((turn)=>(!turn));
                }} />
                <label htmlFor="charAllowed" className="font-light text-gray-500 dark:text-gray-300">Character</label>
                
              </div>
              
            </div>
          </div>
        </div>
      
      </section>
    </>
  )
}

export default App
