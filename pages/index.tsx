import type { NextPage } from 'next'
import Head from "next/head"
import { FormEvent, useEffect, useState, MouseEvent} from 'react'
import speed, { minSpeed, maxSpeed } from "../util/speed"
import speedType from "../types/speed"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
	// ONMOUNT
	useEffect(() => {
		document.addEventListener("keypress", keyListener, false)
		document.addEventListener("paste", () => resizeElement(), false)

		// localstorage mounting
		if (localStorage.getItem("speed")) changeSpeed(parseInt(localStorage.getItem("speed")!))
		else localStorage.setItem("speed", speedVal.toString())
		if (localStorage.getItem("fontSize")) changeFontSize(parseInt(localStorage.getItem("fontSize")!))
		else localStorage.setItem("fontSize", fontSize.toString())
	}, [])

	let [isScrolling, setIsScrolling] = useState<boolean>()
	let [scrollTimeout, setScrollTimeout] = useState <ReturnType<typeof setTimeout>|undefined> ()
	let [speedVal, setSpeedVal] = useState<number>(3)
	let [speedObj, setSpeedObj] = useState<speedType>(() => speed(speedVal))
	let [fontSize, setFontSize] = useState<number>(48)
	const [hack, setHack] = useState<boolean>(false)
	const [minFontSize, maxFontSize] = [0, 100]
	const endNotif = () => { toast.info('End reached', { position: "top-right", autoClose: 3000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, }) }
	// everytime update speed, stop and go
	useEffect(() => {if(isScrolling){stop();forward();}}, [speedObj])

	const resizeElement = (textArea?: HTMLInputElement) => {
		if (!textArea) {
			textArea = document.getElementById("textArea") as HTMLInputElement
		}
		textArea.style.height = "0px"
		textArea.style.height = (textArea.scrollHeight + 1).toString() + "px"
	}
	
	// Util changespeed
	const changeSpeed = (newSpeed: number) => {
		if (newSpeed < minSpeed || newSpeed > maxSpeed) return
		localStorage.setItem("speed", newSpeed.toString())
		setSpeedVal(newSpeed)
		setSpeedObj(speed(newSpeed))
	}
	// change font size util function
	const changeFontSize = (newFontSize: number) => {
		if(newFontSize < minFontSize || newFontSize > maxFontSize) return
		const textarea = document.getElementById('textArea') as HTMLInputElement
		textarea.style.fontSize = newFontSize.toString() + 'px'
		localStorage.setItem("fontSize", newFontSize.toString())
		setFontSize(newFontSize)

		// Hack to fix textarea resizing
		resizeElement(textarea)
	}
	// util forward 
	const forward = ()=>{
		const scrollDown = (offset: number) => {
			const scrollContainer = document.getElementById("scrollContainer")!

			//don't scroll to far
			if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
				endNotif()
				setIsScrolling(false)
				return
			}

			// scroll now
			scrollContainer.scrollTop += offset

			// if stopped, don't scroll anymore
			console.log(isScrolling)
			if (!isScrolling) return

			// recursion
			setHack(oldHack => !oldHack)
			setScrollTimeout(setTimeout(() => { scrollDown(speedObj.step) }, speedObj.scspeed))
		}

		console.log("forward")
		setScrollTimeout(setTimeout(() => { scrollDown(speedObj.step) }, speedObj.scspeed))
	}
	// util stop button
	const stop = ()=>{
		if(scrollTimeout){
			clearTimeout(scrollTimeout)
			setScrollTimeout(undefined)
		}
		else{
			console.error("[Stop function] Scroll timeout does not exist.")
		}
	}

	useEffect(()=>{
		if(typeof isScrolling === "undefined") return
		if (isScrolling){
			// Check not too far
			const scrollContainer = document.getElementById("scrollContainer")!
			if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
				// TODO end reached
				console.log("end reached")
				endNotif()
				setIsScrolling(false)
				return
			}
			forward()
		}
		else{
			const scrollContainer = document.getElementById("scrollContainer")!
			if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) return
			stop()
		}
	}, [isScrolling])
	


	// INPUT EVENTS
	// resize element from typing
	const resizeElementInput = (e: FormEvent) => {
		resizeElement(e.target as HTMLInputElement)
	}
	// frontend speed input
	const changeSpeedInput = (e: MouseEvent, up: boolean) => {
		e.preventDefault()
		const newSpeed = speedVal + (up ? 1 : -1)
		changeSpeed(newSpeed)
	}
	// Textbox resizing, when font size is changing
	const fontSizeInput = (e: MouseEvent, up: boolean) => {
		e.preventDefault()
		const newFontSize = up ? fontSize + 4 : fontSize - 4
		changeFontSize(newFontSize)
	}
	// runs when key is pressed
	const keyListener = (e: KeyboardEvent) => {
		if (e.code === "Space") {
			if (document.activeElement?.tagName !== "BODY") return
			e.preventDefault()
			setIsScrolling(oldVal => !oldVal)
		}
	}
	// Scrolling
	const pause = () => {
		// don't touch isScrolling if it has not been set yet
		// prevents stop() from being called on first render
		if (typeof isScrolling === 'undefined') return
		setIsScrolling(false)
	}
	const play = () => { setIsScrolling(true) }

	return (
		<>
			<Head>
				<title>CB Teleprompter</title>
			</Head>

			<div id="parent" className="relative bg-black">
				<ToastContainer />
				{/* Topbar */}
				<div className="absolute top-2 w-[93%] z-10 center-x bg-white p-2 rounded-md text-lg flex flex-row items-center gap-x-4">
					{/* play and pause */}
					<div className="flex flex-row">
						<button onClick={play} disabled={isScrolling}>
							<svg className={"w-10 h-10 transition-[fill] duration-150 " + (isScrolling ? "fill-gray-200" : "fill-gray-700")} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
							</svg>
						</button>
						<button onClick={pause} disabled={!isScrolling}>
							<svg className={"w-10 h-10 transition-[fill] duration-150 " + (isScrolling ? "fill-gray-700" : "fill-gray-200")} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
						</button>
					</div>

					{/* Scroll Speed */}
					<div className="flex flex-row items-end gap-x-2">
						<p className="self-center">Scroll Speed:</p>
						<button onClick={(e) => { changeSpeedInput(e, false) }} disabled={speedVal == minSpeed} className="font-bold border-2 leading-none p-1 rounded-md disabled:text-gray-300">-</button>
						<p className="self-center">{speedVal}</p>
						<button onClick={(e) => { changeSpeedInput(e, true) }} disabled={speedVal == maxSpeed} className="font-bold border-2 leading-none p-1 rounded-md disabled:text-gray-300">+</button>
					</div>

					{/* Font size */}
					<div className="flex flex-row items-end gap-x-2">
						<p className="self-center">Font Size:</p>
						<button onClick={(e) => { fontSizeInput(e, false) }} disabled={fontSize == minFontSize} className="font-bold border-2 leading-none p-1 rounded-md disabled:text-gray-300">-</button>
						<p className="self-center">{fontSize}</p>
						<button onClick={(e)=>{fontSizeInput(e, true)}} disabled={fontSize == maxFontSize} className="font-bold border-2 leading-none p-1 rounded-md disabled:text-gray-300">+</button>
					</div>

					<p> Click Space to start scrolling </p>
				</div>

				{/* Main Text Area */}
				<div className="h-screen flex justify-center pt-20 overflow-y-scroll" id="scrollContainer">
					<textarea
						id="textArea"
						className="focus:outline-none focus:ring-2 resize-none
							rounded-md p-4 w-[95%]
							font-bold bg-transparent hover:bg-white/10 transition-colors duration-150 text-white"
						style={{ height: `110px`, fontSize: '48px' }}
						onInput={resizeElementInput}
						onFocus={pause}
						placeholder="Paste here..."
						spellCheck="false"
					/>
				</div>
			</div>
		</>
	)
}

export default Home
