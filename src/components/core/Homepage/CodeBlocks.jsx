import React from 'react'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({codeblock,background,codeColor}) => {
  return (
    <div className={`h-fit font-[14px] flex flex-row -gap-1 w-[100%] lg:w-[500px]`}>
                <div className= {` absolute ${background}`}></div>
                    <div className='flex flex-col text-center w-[10%] text-richblack-400 font-inter font-bold'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor}`}>
                            <TypeAnimation 
                                sequence={[codeblock,5000,""]}
                                repeat={Infinity}
                                cursor={true}
                                style={
                                    {
                                        whiteSpace:'pre',
                                        display:''
                                    }
                                }
                                omitDeletionAnimation={true}
                            />
                    </div>
            
    </div>
  )
}

export default CodeBlocks
