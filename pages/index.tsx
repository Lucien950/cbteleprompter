import type { NextPage } from 'next'
import Head from "next/head"
import { FormEvent, useEffect, useState } from 'react'
import speed from "../util/speed"

const Home: NextPage = () => {
	let [isScrolling, setIsScrolling] = useState(false)
	let scrollInterval: ReturnType<typeof setInterval> | undefined; // but also a number??
	let speedVal = 3

	// Textbox resizing
	// when font size is changing
	const fontSizeInput = (fontSize: number)=>{
		const textarea = document.getElementById('textArea') as HTMLInputElement
		textarea.style.fontSize = fontSize.toString() + 'px'
		resizeElement(textarea)
	}
	// everytime the form is changed
	const resizeElementInput = (e: FormEvent) => {
		resizeElement(e.target as HTMLInputElement)
	}
	// backend resize function
	const resizeElement = (textArea: HTMLInputElement) => {
		textArea.style.height = "0px"
		textArea.style.height = textArea.scrollHeight.toString() + "px"
	}

	// Scrolling
	const pause  = ()=>{
		setIsScrolling(false)
		stop()
	}
	const play = ()=>{
		setIsScrolling(true)
		forward()
	}

	const forward = ()=>{
		const { step, scspeed } = speed(speedVal)
		const scrollDown = (offset: number) => {
			if(scrollInterval){
				console.error("Scroll interval already exists")
				return
			}

			
			const scrollContainer = document.getElementById("scrollContainer")!

			if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
				clearInterval(scrollInterval!)
				scrollInterval = undefined
				setIsScrolling(false)
				return
			}
			scrollContainer.scrollTop += offset
		}
		scrollInterval = setInterval(() => { scrollDown(step) }, scspeed)
	}
	const stop = ()=>{
		if (scrollInterval) {
			clearInterval(scrollInterval)
			scrollInterval = undefined
		}else{
			console.error("ScrollInterval Not Here")
		}
	}

	// runs when key is pressed
	const keyListener = (e: KeyboardEvent) => {
		if (e.code === "Space") {
			if (document.activeElement?.id === "textArea") return
			e.preventDefault()
			setIsScrolling(oldVal => !oldVal)
		}
	}
	// add listener at mount
	useEffect(() => {
		document.addEventListener("keypress", keyListener, false)
		document.getElementById("textArea")!.addEventListener("focus", pause, false)
	}, [])

	useEffect(()=>{
		if (isScrolling) forward()
		else stop()
	}, [isScrolling])

	return (
		<>
			<Head>
				<title>CB Teleprompter</title>
			</Head>

			<div id="parent" className="relative bg-black">
				<div className="absolute top-2 w-[93%] z-10 center-x bg-white p-2 rounded-md text-lg flex flex-row items-center gap-x-4">
					{/* play and pause */}
					<div className="flex flex-row">
						<svg onClick={play} className={"w-10 h-10 transition-[fill] duration-75 cursor-pointer " + (isScrolling ? "fill-gray-200" : "fill-gray-700")} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
						</svg>
						<svg onClick={pause} className={"w-10 h-10 transition-[fill] duration-75 cursor-pointer " + (isScrolling ? "fill-gray-700" : "fill-gray-200")} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
					</div>

					{/* Scroll Speed */}
					<div className="flex flex-row items-end gap-x-2">
						<p className="self-center">Scroll Speed:</p>
						<button onClick={()=>{speedVal = 1}} className="border-2 leading-none p-1 rounded-md">Slow</button>
						<button onClick={()=>{speedVal = 3}} className="border-2 leading-none p-1 rounded-md">Medium</button>
						<button onClick={()=>{speedVal = 5}} className="border-2 leading-none p-1 rounded-md">Fast</button>
					</div>

					{/* Font size */}
					<div className="flex flex-row items-end gap-x-2">
						<p className="self-center">Font Size:</p>
						<button onClick={()=>{fontSizeInput(36)}} className="text-sm border-2 leading-none p-1 rounded-md">A</button>
						<button onClick={()=>{fontSizeInput(48)}} className="text-lg border-2 leading-none p-1 rounded-md">A</button>
						<button onClick={()=>{fontSizeInput(60)}} className="text-2xl border-2 leading-none p-1 rounded-md">A</button>
					</div>

					{/* random tips */}
					<p> Click Space to start scrolling </p>
				</div>

				<div className="h-screen overflow-y-scroll flex justify-center pt-20" id="scrollContainer">
					<textarea
						id="textArea"
						className="focus:outline-none focus:ring-2 resize-none
							rounded-md p-4 w-[98%]
							font-bold bg-transparent hover:bg-white/10 transition-colors duration-150 text-white"
						style={{ height: `110px`, fontSize: '48px' }}
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
