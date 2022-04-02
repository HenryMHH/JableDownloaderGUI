import React, { useState } from 'react'
import { FaReact, FaAngular, FaPython, FaVuejs, FaRust, FaSass, FaBootstrap } from 'react-icons/fa'
import { CgCPlusPlus } from 'react-icons/cg'
import { SiNextdotjs, SiCsharp, SiPug, SiWebpack, SiElectron, SiSolidity, SiRedux, SiPhp, SiVite, SiWebassembly, SiJenkins, SiHtml5 } from 'react-icons/si'
import { DiRuby } from 'react-icons/di'
import { IconType } from 'react-icons'

const initialData = [
	{ title: 'React', icon: FaReact },
	{ title: 'Angular', icon: FaAngular },
	{ title: 'Python', icon: FaPython },
	{ title: 'Vue', icon: FaVuejs },
	{ title: 'Rust', icon: FaRust },
	{ title: 'Sass', icon: FaSass },
	{ title: 'Boostrap', icon: FaBootstrap },
	{ title: 'C++', icon: CgCPlusPlus },
	{ title: 'C#', icon: SiCsharp },
	{ title: 'Pug', icon: SiPug },
	{ title: 'NextJS', icon: SiNextdotjs },
	{ title: 'Ruby', icon: DiRuby },
	{ title: 'Webpack', icon: SiWebpack },
	{ title: 'Electron', icon: SiElectron },
	{ title: 'Solidity', icon: SiSolidity },
	{ title: 'Redux', icon: SiRedux },
	{ title: 'Vite', icon: SiVite },
	{ title: 'Webassembly', icon: SiWebassembly },
	{ title: 'Php', icon: SiPhp },
	{ title: 'Jenkins', icon: SiJenkins },
	{ title: 'Html5', icon: SiHtml5 },
]

const fakeArticleList = [
	'Styling React Applications with Styled Components',
	'Manage Application State with Jotai Atoms',
	'Ionic Quickstart for Windows: Installing Ionic',
	'Get Started with the AWS Amplify Admin UI',
	'Create Contextual Video Analysis App with NextJS and Symbl.ai',
	'Manage React Form State with redux-form',
	'Angular Service Injection with the Dependency Injector (DI)',
	'Manage Application State with Mobx-state-tree',
	'Integrate IBM Domino with Node.js',
	'JSON Web Token (JWT) Authentication with Node.js and Auth0',
	'Test React Components with Enzyme and Jest',
	'Making an HTTP server in ReasonML on top of Node.js',
	'AngularJS with Webpack - Testing with Karma, Mocha, and Chai',
	'AngularJS with Webpack - Production Setup',
	'Install the Genymotion Android Emulator for Ionic',
	'Edit Your Ionic Application Code',
	'Use the fs/promises node API to Serialize a Map to the Filesystem',
	'Sort and Return an Array of Objects with a Query Param in an Express API',
	'Add Basic Error Handling to an Express 5 App',
	'Deploy a Node.js function to AWS Lambda using the Serverless Framework',
	'Deploy a DynamoDB table to AWS using the Serverless Framework',
	'Deploy an AWS Lambda to retrieve a record from DynamoDB with the Serverless Framework',
	'Course Overview: Develop a Serverless Backend using Node.js on AWS Lambda',
	'Setup the Serverless Framework',
]

export default function useGetSaftyModeData() {
	const [fakeData, setFakeData] = useState<Array<{ title: string; icon: IconType }>>(initialData)
	const [fakeArticle, setFakeArticle] = useState<Array<string>>(fakeArticleList)
	return { fakeData, fakeArticle }
}
