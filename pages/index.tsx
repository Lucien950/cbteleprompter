import type { NextPage } from 'next'
import Head from "next/head"
import { FormEvent, useEffect, useState } from 'react'
import speed from "../util/speed"

const Home: NextPage = () => {
	let [scroll, setScroll] = useState(80)
	let [isScrolling, setIsScrolling] = useState(false)
	let scrolltimerdown: any;


	const fontSizeInput = (fontSize: number)=>{
		const textarea = document.getElementById('textArea') as HTMLInputElement
		textarea.style.fontSize = fontSize.toString() + 'px'
		resizeElement(textarea)
	}
	const resizeElementInput = (e: FormEvent) => {
		const textArea = e.target as HTMLInputElement
		resizeElement(textArea)
	}

	const resizeElement = (textArea: HTMLInputElement) => {
		textArea.style.height = "0px"
		textArea.style.height = textArea.scrollHeight.toString() + "px"
	}



	const forward = ()=>{
		if (scrolltimerdown) {
			clearInterval(scrolltimerdown)
		}

		const { step, scspeed } = speed(3)
		const contentobj = document.getElementById('textArea') as HTMLInputElement
		// if (parseInt(contentobj.style.top) >= (contentheight * (-1) + 100)) {
		contentobj.style.top = (parseInt(contentobj.style.top) - step).toString() + 'px'
		// }
		scrolltimerdown = setTimeout(forward, scspeed)
	}

	useEffect(()=>{
		document.addEventListener("keypress", (e) => {
			if (e.code === "Space") {
				setIsScrolling(prev => !prev)
				forward()
			}
		}, false);
	},[])
	

	return (
		<>
			<Head>
				<title>CB Teleprompter</title>
			</Head>

			<div id="parent" className="relative bg-black">
				<div className="
					absolute top-2 w-[93%] z-10 center-x
					bg-white p-2 rounded-md text-lg
					flex flex-row items-center gap-x-4"
				>

					<div className="flex flex-row">
						<svg onClick={()=>{setIsScrolling(true)}} className={"w-10 h-10 transition-[fill] duration-75 cursor-pointer " + (isScrolling ? "fill-gray-200" : "fill-gray-700")} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
						<svg onClick={()=>{setIsScrolling(false)}} className={"w-10 h-10 transition-[fill] duration-75 cursor-pointer " + (isScrolling ? "fill-gray-700" : "fill-gray-200")} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
					</div>


					<div className="flex flex-row items-end gap-x-2">
						<p className="self-center">Scroll Speed:</p>
						<button className="border-2 leading-none p-1 rounded-md">Slow</button>
						<button className="border-2 leading-none p-1 rounded-md">Medium</button>
						<button className="border-2 leading-none p-1 rounded-md">Fast</button>
					</div>

					<div className="flex flex-row items-end gap-x-2">
						<p className="self-center">Font Size:</p>
						<button onClick={()=>{fontSizeInput(36)}} className="text-sm border-2 leading-none p-1 rounded-md">A</button>
						<button onClick={()=>{fontSizeInput(48)}} className="text-lg border-2 leading-none p-1 rounded-md">A</button>
						<button onClick={()=>{fontSizeInput(60)}} className="text-2xl border-2 leading-none p-1 rounded-md">A</button>
					</div>
				</div>

				<div className="h-screen relative">
					<textarea
						id="textArea"
						className="focus:outline-none focus:ring-2 resize-none
							rounded-md p-4
							absolute w-[98%] center-x
							font-bold bg-transparent hover:bg-white/10 transition-colors duration-150 text-white"
						style={{ top: `${scroll}px`, height: `110px`, fontSize: '48px' }}
						onInput={resizeElementInput}
						placeholder="Paste here..."
						spellCheck="false"
					/>
				</div>
			</div>

		</>
	)
}

export default Home
